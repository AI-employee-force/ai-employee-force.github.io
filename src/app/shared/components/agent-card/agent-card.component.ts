import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { agentPortraitSrc } from '../../../core/constants/agent-assets';
import type { Agent } from '../../../core/models/site.models';

@Component({
	selector: 'app-agent-card',
	imports: [RouterLink],
	templateUrl: './agent-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentCardComponent {
	readonly agent = input.required<Agent>();

	protected readonly portraitUrl = computed(() => agentPortraitSrc(this.agent().slug));
}
