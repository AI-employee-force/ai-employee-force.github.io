import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { RunsService } from '../../../../core/services/runs.service';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { RunsTableComponent } from '../../components/runs-table/runs-table.component';
import type { RunStatus } from '../../../../core/models/workspace.models';

@Component({
	selector: 'app-runs-page',
	standalone: true,
	imports: [SectionHeadingComponent, RunsTableComponent, RevealOnScrollDirective],
	templateUrl: './runs-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunsPageComponent {
	private readonly runsService = inject(RunsService);
	private readonly catalog = inject(AgentCatalogService);

	protected readonly filteredRuns = this.runsService.filteredRuns;
	protected readonly statusFilter = this.runsService.statusFilter;
	protected readonly counts = this.runsService.counts;
	protected readonly agentMap = computed(() => new Map(this.catalog.getAll().map((a) => [a.slug, a])));

	protected readonly filterTabs: { id: RunStatus | 'all'; label: string }[] = [
		{ id: 'all', label: 'All' },
		{ id: 'completed', label: 'Completed' },
		{ id: 'running', label: 'Running' },
		{ id: 'failed', label: 'Failed' },
	];

	protected setFilter(status: RunStatus | 'all'): void {
		this.runsService.setFilter(status);
	}

	protected tabBtnClass(id: RunStatus | 'all'): string {
		const active = this.statusFilter() === id;
		const base =
			'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-400/70';
		if (active) {
			return `${base} border-cyan-400/50 bg-cyan-500/10 text-cyan-800 dark:border-cyan-400/35 dark:bg-cyan-500/15 dark:text-cyan-200`;
		}
		return `${base} border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-400`;
	}

	protected tabCountClass(id: RunStatus | 'all'): string {
		const active = this.statusFilter() === id;
		const base = 'rounded-full px-2 py-0.5 text-xs tabular-nums';
		if (active) {
			return `${base} bg-cyan-500/20 text-cyan-800 dark:bg-cyan-400/20 dark:text-cyan-200`;
		}
		return `${base} bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300`;
	}
}
