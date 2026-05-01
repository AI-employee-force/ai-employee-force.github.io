import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { SOLUTION_PILLARS } from '../../../../core/data/landing-content';

@Component({
	selector: 'app-solution-section',
	standalone: true,
	imports: [SectionHeadingComponent],
	templateUrl: './solution-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionSectionComponent {
	protected readonly pillars = SOLUTION_PILLARS;
}
