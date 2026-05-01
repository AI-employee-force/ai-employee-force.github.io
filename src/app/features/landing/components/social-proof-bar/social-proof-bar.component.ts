import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TESTIMONIALS } from '../../../../core/data/landing-content';

@Component({
	selector: 'app-social-proof-bar',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './social-proof-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialProofBarComponent {
	protected readonly testimonials = TESTIMONIALS;
}
