import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Agent } from '../../../core/models/site.models';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
	selector: 'app-agent-card',
	imports: [PrimaryButtonComponent],
	templateUrl: './agent-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentCardComponent {
	readonly agent = input.required<Agent>();
}
