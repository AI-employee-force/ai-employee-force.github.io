import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { RunStatus } from '../../../../core/models/workspace.models';

@Component({
	selector: 'app-run-status-badge',
	standalone: true,
	templateUrl: './run-status-badge.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunStatusBadgeComponent {
	readonly status = input.required<RunStatus>();

	protected readonly config = computed(() => {
		switch (this.status()) {
			case 'completed':
				return {
					label: 'Completed',
					classes:
						'border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300',
					dotClasses: 'bg-emerald-500 dark:bg-emerald-400',
				};
			case 'running':
				return {
					label: 'Running',
					classes:
						'border-cyan-400/30 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300',
					dotClasses: 'bg-cyan-500 dark:bg-cyan-400 animate-pulse',
				};
			case 'failed':
				return {
					label: 'Failed',
					classes:
						'border-red-400/30 bg-red-500/10 text-red-700 dark:border-red-400/25 dark:bg-red-400/10 dark:text-red-300',
					dotClasses: 'bg-red-500 dark:bg-red-400',
				};
		}
	});
}
