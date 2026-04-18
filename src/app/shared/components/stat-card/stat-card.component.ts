import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Stat } from '../../../core/models/site.models';

@Component({
	selector: 'app-stat-card',
	templateUrl: './stat-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
	readonly stat = input.required<Stat>();
}
