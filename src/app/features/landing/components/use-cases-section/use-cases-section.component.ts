import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { USE_CASES } from '../../../../core/data/landing-content';

@Component({
	selector: 'app-use-cases-section',
	standalone: true,
	imports: [RouterLink, SectionHeadingComponent],
	templateUrl: './use-cases-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCasesSectionComponent {
	protected readonly cases = USE_CASES;
}
