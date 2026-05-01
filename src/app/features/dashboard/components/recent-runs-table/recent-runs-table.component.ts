import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import type { Run } from '../../../../core/models/workspace.models';
import type { Agent } from '../../../../core/models/site.models';
import { RunStatusBadgeComponent } from '../../../runs/components/run-status-badge/run-status-badge.component';

@Component({
	selector: 'app-recent-runs-table',
	standalone: true,
	imports: [RouterLink, RunStatusBadgeComponent],
	templateUrl: './recent-runs-table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentRunsTableComponent {
	readonly runs = input.required<readonly Run[]>();
	readonly agentMap = input.required<Map<string, Agent>>();

	protected portraitSrc(slug: string): string {
		return agentPortraitSrc(slug);
	}

	protected formatTime(iso: string): string {
		return new Date(iso).toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
		});
	}
}
