import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { STARTER_PROMPTS } from '../data/mock-workspace';
import type { WorkspaceState } from '../models/workspace.models';
import { AgentApiService } from './agent-api.service';
import { AgentCatalogService } from './agent-catalog.service';
import { AgentChainService } from './agent-chain.service';
import { AnalyticsService } from './analytics.service';
import { DemoModeService } from './demo-mode.service';
import { MockAgentRunnerService } from './mock-agent-runner.service';
import { RunsService } from './runs.service';

const DEMO_DEFAULT_PROMPTS: Partial<Record<string, string>> = {
	producto: 'Build a SaaS product for AI workforce management — agents hired by role, structured outputs, and multi-agent chaining.',
};

const INITIAL_STATE: WorkspaceState = {
	agentSlug: '',
	prompt: '',
	isRunning: false,
	hasResult: false,
	output: null,
	activeTab: 'overview',
	starterPrompts: [],
};

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
	private readonly _state = signal<WorkspaceState>(INITIAL_STATE);
	private readonly _currentRunId = signal<string | null>(null);
	private readonly _nextPrompt = signal<string | null>(null);

	private readonly runner = inject(MockAgentRunnerService);
	private readonly _chainService = inject(AgentChainService);
	private readonly _apiService = inject(AgentApiService);
	private readonly _runsService = inject(RunsService);
	private readonly _catalogService = inject(AgentCatalogService);
	private readonly _analytics = inject(AnalyticsService);
	private readonly _demoMode = inject(DemoModeService);

	readonly state = this._state.asReadonly();
	readonly currentRunId = this._currentRunId.asReadonly();
	readonly isRunning = computed(() => this._state().isRunning);
	readonly hasResult = computed(() => this._state().hasResult);
	readonly output = computed(() => this._state().output);
	readonly activeTab = computed(() => this._state().activeTab);
	readonly starterPrompts = computed(() => this._state().starterPrompts);

	/** Forwarded demo mode exhaustion for workspace UI. */
	readonly demoExhausted = this._demoMode.isExhausted;
	readonly demoRunsUsed = this._demoMode.runsUsed;
	readonly demoMaxRuns = this._demoMode.maxRuns;

	/** Forwards the runner's live stage label for the workspace UI. */
	readonly executionStage = this.runner.stage;
	readonly stageLabel = this.runner.stageLabel;

	/** Chain state forwarded from AgentChainService. */
	readonly isInChain = this._chainService.isInChain;
	readonly completedSteps = this._chainService.completedSteps;

	setNextPrompt(prompt: string): void {
		this._nextPrompt.set(prompt);
	}

	initForAgent(slug: string): void {
		this.runner.resetStage();
		// Priority: template next-prompt > chain handoff > demo default
		const nextPrompt = this._consumeNextPrompt();
		const pendingPrompt = this._chainService.consumePendingPrompt();
		const defaultPrompt = nextPrompt ?? pendingPrompt ?? DEMO_DEFAULT_PROMPTS[slug] ?? '';
		this._state.set({
			agentSlug: slug,
			prompt: defaultPrompt,
			isRunning: false,
			hasResult: false,
			output: null,
			activeTab: 'overview',
			starterPrompts: STARTER_PROMPTS[slug] ?? STARTER_PROMPTS['fronto'] ?? [],
		});
	}

	setPrompt(prompt: string): void {
		this._state.update((s) => ({ ...s, prompt }));
	}

	setActiveTab(tab: WorkspaceState['activeTab']): void {
		this._state.update((s) => ({ ...s, activeTab: tab }));
	}

	run(): void {
		// Block if demo runs exhausted
		if (this._demoMode.isExhausted()) {
			this._analytics.track('demo_exhausted', { agentSlug: this._state().agentSlug });
			return;
		}

		const { agentSlug, prompt } = this._state();
		const runId = `run-${Date.now()}`;
		this._currentRunId.set(runId);
		this._state.update((s) => ({ ...s, isRunning: true, hasResult: false, output: null }));
		this.runner.resetStage();

		this._analytics.track('run_started', { agentSlug });

		// Start visual stage simulation immediately for loading labels
		const cancelSim = this.runner.simulateStagesOnly(agentSlug);

		// Try real API first; fall back to mock on any failure or timeout
		firstValueFrom(this._apiService.run(agentSlug, prompt))
			.then((output) => {
				cancelSim();
				this.runner.forceComplete();
				const agent = this._catalogService.getBySlug(agentSlug);
				this._runsService.addRun({
					id: runId,
					agentSlug,
					agentName: agent?.name ?? agentSlug,
					agentCategory: agent?.category ?? 'product',
					promptPreview: prompt.length > 80 ? prompt.slice(0, 77) + '…' : prompt,
					fullPrompt: prompt,
					status: 'completed',
					timestamp: new Date().toISOString(),
					outputSummary: output.overview.slice(0, 120),
					workspaceOutput: output,
				});
				this._demoMode.increment();
				this._analytics.track('run_completed', { agentSlug });
				this._state.update((s) => ({
					...s,
					isRunning: false,
					hasResult: true,
					output,
					activeTab: 'overview',
				}));
			})
			.catch((err: unknown) => {
				cancelSim();
				console.warn('[WorkspaceService] API unavailable, using mock:', (err as Error).message);
				this.runner.resetStage();
				return this.runner.runAgent(agentSlug, agentSlug, prompt).then((record) => {
					const agent = this._catalogService.getBySlug(agentSlug);
					this._runsService.addRun({
						id: runId,
						agentSlug,
						agentName: agent?.name ?? agentSlug,
						agentCategory: agent?.category ?? 'product',
						promptPreview: prompt.length > 80 ? prompt.slice(0, 77) + '…' : prompt,
						fullPrompt: prompt,
						status: 'completed',
						timestamp: new Date().toISOString(),
						outputSummary: record.workspaceOutput?.overview?.slice(0, 120),
						workspaceOutput: record.workspaceOutput ?? undefined,
					});
					this._demoMode.increment();
					this._analytics.track('run_completed', { agentSlug });
					this._state.update((s) => ({
						...s,
						isRunning: false,
						hasResult: true,
						output: record.workspaceOutput,
						activeTab: 'overview',
					}));
				});
			})
			.catch(() => {
				this._state.update((s) => ({ ...s, isRunning: false }));
			});
	}

	reset(): void {
		this._chainService.clearChain();
		this._currentRunId.set(null);
		this.initForAgent(this._state().agentSlug);
	}

	private _consumeNextPrompt(): string | null {
		const p = this._nextPrompt();
		this._nextPrompt.set(null);
		return p;
	}
}
