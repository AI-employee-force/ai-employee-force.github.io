import { Injectable, computed, signal } from '@angular/core';
import { AGENT_RUN_OUTPUTS } from '../data/mock-workspace';
import type { AgentRunRecord, AgentRunStage, AgentRunStatus } from '../models/workspace.models';

const STAGE_LABELS: Record<string, { analyzing: string; generating: string }> = {
	producto: { analyzing: 'Analyzing your idea…', generating: 'Designing product strategy…' },
	fronto:   { analyzing: 'Reviewing the spec…',   generating: 'Designing components…' },
	testo:    { analyzing: 'Parsing the implementation…', generating: 'Building test suite…' },
	backo:    { analyzing: 'Reviewing the requirements…', generating: 'Drafting API contract…' },
	devopsy:  { analyzing: 'Scanning the stack…',   generating: 'Generating pipeline config…' },
};
const DEFAULT_LABELS = { analyzing: 'Analyzing your request…', generating: 'Generating structured output…' };

@Injectable({ providedIn: 'root' })
export class MockAgentRunnerService {
	private readonly _stage = signal<AgentRunStage>('idle');
	private readonly _status = signal<AgentRunStatus | null>(null);
	private readonly _history = signal<AgentRunRecord[]>([]);
	private readonly _current = signal<AgentRunRecord | null>(null);
	private readonly _runningSlug = signal('');

	readonly stage = this._stage.asReadonly();
	readonly status = this._status.asReadonly();
	readonly history = this._history.asReadonly();
	readonly current = this._current.asReadonly();

	readonly stageLabel = computed(() => {
		const labels = STAGE_LABELS[this._runningSlug()] ?? DEFAULT_LABELS;
		switch (this._stage()) {
			case 'idle':       return '';
			case 'analyzing':  return labels.analyzing;
			case 'generating': return labels.generating;
			case 'completed':  return 'Done — output ready';
			case 'failed':     return 'Run failed';
		}
	});

	runAgent(agentSlug: string, agentName: string, prompt: string): Promise<AgentRunRecord> {
		const id = `run-${Date.now()}`;
		const initial: AgentRunRecord = {
			id,
			agentSlug,
			agentName,
			prompt,
			promptPreview: prompt.length > 80 ? prompt.slice(0, 77) + '…' : prompt,
			stage: 'idle',
			status: 'loading',
			startedAt: new Date().toISOString(),
			completedAt: null,
			typedOutput: null,
			workspaceOutput: null,
			errorMessage: null,
		};

		this._current.set(initial);
		this._stage.set('idle');
		this._status.set('loading');
		this._runningSlug.set(agentSlug);

		// Stage delays with natural jitter
		const analyzeDelay = 1000 + Math.random() * 500;   // 1.0–1.5 s
		const generateDelay = 1200 + Math.random() * 600;  // 1.2–1.8 s
		const completeDelay = 300;                          // 0.3 s

		return new Promise<AgentRunRecord>((resolve, reject) => {
			setTimeout(() => {
				// ── Stage: analyzing ──
				this._stage.set('analyzing');
				this._patch({ stage: 'analyzing' });

				setTimeout(() => {
					// ── Stage: generating ──
					this._stage.set('generating');
					this._patch({ stage: 'generating' });

					setTimeout(() => {
						const outputData = AGENT_RUN_OUTPUTS[agentSlug] ?? AGENT_RUN_OUTPUTS['default'];

						if (!outputData) {
							this._stage.set('failed');
							this._status.set('error');
							const failed = this._patch({
								stage: 'failed',
								status: 'error',
								errorMessage: 'No output template found for this agent.',
								completedAt: new Date().toISOString(),
							});
							this._pushHistory(failed);
							reject(failed);
							return;
						}

						// ── Stage: completed ──
						this._stage.set('completed');
						this._status.set('success');
						const completed = this._patch({
							stage: 'completed',
							status: 'success',
							typedOutput: outputData.typed,
							workspaceOutput: outputData.workspace,
							completedAt: new Date().toISOString(),
						});
						this._pushHistory(completed);
						resolve(completed);
					}, completeDelay);
				}, generateDelay);
			}, analyzeDelay);
		});
	}

	resetStage(): void {
		this._stage.set('idle');
		this._status.set(null);
		this._current.set(null);
	}

	/** Animates stage labels for visual feedback only — no output produced.
	 *  Returns a cancel function that stops the timers (call when real API resolves). */
	simulateStagesOnly(agentSlug: string): () => void {
		this._runningSlug.set(agentSlug);
		const t1 = setTimeout(() => this._stage.set('analyzing'), 700 + Math.random() * 300);
		const t2 = setTimeout(() => this._stage.set('generating'), 1700 + Math.random() * 500);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}

	/** Immediately advances to the completed state (called when real API wins the race). */
	forceComplete(): void {
		this._stage.set('completed');
		this._status.set('success');
	}

	private _patch(patch: Partial<AgentRunRecord>): AgentRunRecord {
		const next = { ...this._current()!, ...patch };
		this._current.set(next);
		return next;
	}

	private _pushHistory(record: AgentRunRecord): void {
		this._history.update((h) => [record, ...h]);
	}
}
