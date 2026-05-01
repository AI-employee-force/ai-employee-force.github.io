import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { PROBLEM_CARDS } from '../../../../core/data/landing-content';

@Component({
	selector: 'app-problem-section',
	standalone: true,
	imports: [SectionHeadingComponent],
	templateUrl: './problem-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemSectionComponent {
	protected readonly cards = PROBLEM_CARDS;
}
