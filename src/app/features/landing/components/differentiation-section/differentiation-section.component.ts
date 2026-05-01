import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { COMPARISON_ROWS } from '../../../../core/data/landing-content';

@Component({
	selector: 'app-differentiation-section',
	standalone: true,
	imports: [SectionHeadingComponent],
	templateUrl: './differentiation-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentiationSectionComponent {
	protected readonly rows = COMPARISON_ROWS;
}
