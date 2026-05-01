import { Injectable, computed, signal } from '@angular/core';
import { MOCK_RUNS } from '../data/mock-workspace';
import type { Run, RunStatus } from '../models/workspace.models';

@Injectable({ providedIn: 'root' })
export class RunsService {
	private readonly _runs = signal<Run[]>([...MOCK_RUNS]);
	private readonly _statusFilter = signal<RunStatus | 'all'>('all');

	readonly statusFilter = this._statusFilter.asReadonly();

	readonly filteredRuns = computed(() => {
		const filter = this._statusFilter();
		const runs = this._runs();
		if (filter === 'all') return runs;
		return runs.filter((r) => r.status === filter);
	});

	readonly counts = computed(() => {
		const runs = this._runs();
		return {
			all: runs.length,
			completed: runs.filter((r) => r.status === 'completed').length,
			running: runs.filter((r) => r.status === 'running').length,
			failed: runs.filter((r) => r.status === 'failed').length,
		};
	});

	readonly recentRuns = computed(() => this._runs().slice(0, 5));

	readonly savedRuns = computed(() => this._runs().filter((r) => r.saved));

	readonly completedCount = computed(() => this._runs().filter((r) => r.status === 'completed').length);

	setFilter(status: RunStatus | 'all'): void {
		this._statusFilter.set(status);
	}

	getById(id: string): Run | undefined {
		return this._runs().find((r) => r.id === id);
	}

	addRun(run: Run): void {
		this._runs.update((rs) => [run, ...rs]);
	}

	toggleSave(id: string): void {
		this._runs.update((rs) => rs.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r)));
	}
}
