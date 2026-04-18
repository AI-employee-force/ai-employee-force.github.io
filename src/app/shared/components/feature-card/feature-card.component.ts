import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Feature } from '../../../core/models/site.models';

@Component({
	selector: 'app-feature-card',
	templateUrl: './feature-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
	readonly feature = input.required<Feature>();
}
