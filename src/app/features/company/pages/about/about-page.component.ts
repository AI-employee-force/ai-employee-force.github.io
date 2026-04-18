import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CONTACT_CTA } from '../../../../core/data/landing-content';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { CtaSectionComponent } from '../../../../shared/components/cta-section/cta-section.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-about-page',
	imports: [SectionHeadingComponent, CtaSectionComponent, RevealOnScrollDirective],
	templateUrl: './about-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
	protected readonly contactCta = CONTACT_CTA;
}
