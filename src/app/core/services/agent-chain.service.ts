import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import type { AgentChain, AgentChainStep, WorkspaceOutput } from '../models/workspace.models';
import { AnalyticsService } from './analytics.service';

const CHAIN_SEQUENCE = ['producto', 'fronto', 'testo'];

@Injectable({ providedIn: 'root' })
export class AgentChainService {
	private readonly router = inject(Router);
	private readonly _analytics = inject(AnalyticsService);

	private readonly _chain = signal<AgentChain | null>(null);
	private readonly _lastChain = signal<AgentChain | null>(null);
	private readonly _pendingPrompt = signal<string | null>(null);

	readonly chain = this._chain.asReadonly();
	readonly lastChain = this._lastChain.asReadonly();
	readonly pendingPrompt = this._pendingPrompt.asReadonly();
	readonly isInChain = computed(() => this._chain() !== null);
	readonly completedSteps = computed(() => this._chain()?.steps ?? []);

	/** Called when the user clicks a handoff button. Records the completed step,
	 *  synthesises a contextual prompt, and navigates to the next agent's workspace. */
	initiateHandoff(
		fromSlug: string,
		fromName: string,
		fromPrompt: string,
		fromOutput: WorkspaceOutput,
		toSlug: string,
	): void {
		const step: AgentChainStep = {
			agentSlug: fromSlug,
			agentName: fromName,
			prompt: fromPrompt,
			output: fromOutput,
			completedAt: new Date().toISOString(),
		};

		const existing = this._chain();
		if (existing) {
			this._chain.update((c) => (c ? { ...c, steps: [...c.steps, step] } : c));
		} else {
			this._chain.set({ id: `chain-${Date.now()}`, steps: [step] });
		}

		this._analytics.track('agent_chained', { fromSlug, toSlug });
		this._pendingPrompt.set(this._synthesize(fromSlug, toSlug, fromOutput));
		this.router.navigate(['/workspace', toSlug]);
	}

	/** One-shot read + clear. Called by WorkspaceService.initForAgent to auto-fill the prompt. */
	consumePendingPrompt(): string | null {
		const p = this._pendingPrompt();
		this._pendingPrompt.set(null);
		return p;
	}

	clearChain(): void {
		const current = this._chain();
		if (current) this._lastChain.set(current);
		this._chain.set(null);
		this._pendingPrompt.set(null);
	}

	/** Restores the last cleared chain and navigates to the next pending agent. */
	resumeLastChain(): void {
		const last = this._lastChain();
		if (!last) return;

		this._chain.set(last);
		this._lastChain.set(null);

		const completedSlugs = new Set(last.steps.map((s) => s.agentSlug));
		const nextSlug = CHAIN_SEQUENCE.find((s) => !completedSlugs.has(s));

		if (nextSlug) {
			this.router.navigate(['/workspace', nextSlug]);
		}
	}

	/** Returns the available handoff targets for the given source agent. */
	targetsFor(fromSlug: string): { slug: string; label: string }[] {
		switch (fromSlug) {
			case 'producto':
				return [
					{ slug: 'fronto', label: 'Generate UI →' },
					{ slug: 'testo',  label: 'Create test cases →' },
				];
			case 'fronto':
				return [{ slug: 'testo', label: 'Create test cases →' }];
			case 'testo':
				return []; // end of chain
			default:
				return [
					{ slug: 'fronto', label: 'Generate UI →' },
					{ slug: 'testo',  label: 'Create test cases →' },
				];
		}
	}

	private _synthesize(from: string, to: string, output: WorkspaceOutput): string {
		const summary = output.overview;
		const bullets = output.details
			.slice(0, 3)
			.map((d) => `• ${d}`)
			.join('\n');

		if (from === 'producto' && to === 'fronto') {
			return `Based on the following product specification:\n\n${summary}\n\nKey features:\n${bullets}\n\nDesign and specify the Angular UI components, layout regions, and design tokens needed to implement this product feature.`;
		}
		if (to === 'testo') {
			return `Based on the following output:\n\n${summary}\n\nKey details:\n${bullets}\n\nCreate comprehensive test cases, identify edge cases, and produce a prioritised QA checklist to validate this implementation.`;
		}
		return `Based on the following agent output:\n\n${summary}\n\nDetails:\n${bullets}\n\nContinue this work as the next agent in the pipeline.`;
	}
}
