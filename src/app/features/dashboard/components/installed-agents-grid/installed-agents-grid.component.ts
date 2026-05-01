import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import type { InstalledAgent } from '../../../../core/models/workspace.models';
import type { Agent } from '../../../../core/models/site.models';

@Component({
	selector: 'app-installed-agents-grid',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './installed-agents-grid.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstalledAgentsGridComponent {
	readonly installedAgents = input.required<readonly InstalledAgent[]>();
	readonly agentMap = input.required<Map<string, Agent>>();

	protected readonly enriched = computed(() =>
		this.installedAgents().map((ia) => ({
			...ia,
			agent: this.agentMap().get(ia.slug),
			portraitSrc: agentPortraitSrc(ia.slug),
		})),
	);
}
