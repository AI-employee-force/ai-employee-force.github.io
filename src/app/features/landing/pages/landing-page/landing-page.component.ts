import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import {
	CONTACT_CTA,
	LANDING_STATS,
	PLATFORM_FEATURES,
	PRIMARY_LANDING_CTA,
} from '../../../../core/data/landing-content';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { AgentCardComponent } from '../../../../shared/components/agent-card/agent-card.component';
import { FeatureCardComponent } from '../../../../shared/components/feature-card/feature-card.component';
import { CtaSectionComponent } from '../../../../shared/components/cta-section/cta-section.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { SocialProofBarComponent } from '../../components/social-proof-bar/social-proof-bar.component';
import { ProblemSectionComponent } from '../../components/problem-section/problem-section.component';
import { SolutionSectionComponent } from '../../components/solution-section/solution-section.component';
import { DemoFlowSectionComponent } from '../../components/demo-flow-section/demo-flow-section.component';
import { DifferentiationSectionComponent } from '../../components/differentiation-section/differentiation-section.component';
import { UseCasesSectionComponent } from '../../components/use-cases-section/use-cases-section.component';
import { PricingTeaserComponent } from '../../components/pricing-teaser/pricing-teaser.component';
import { WaitlistBarComponent } from '../../components/waitlist-bar/waitlist-bar.component';

@Component({
	selector: 'app-landing-page',
	imports: [
		SectionHeadingComponent,
		AgentCardComponent,
		FeatureCardComponent,
		CtaSectionComponent,
		PrimaryButtonComponent,
		RevealOnScrollDirective,
		SocialProofBarComponent,
		ProblemSectionComponent,
		SolutionSectionComponent,
		DemoFlowSectionComponent,
		DifferentiationSectionComponent,
		UseCasesSectionComponent,
		PricingTeaserComponent,
		WaitlistBarComponent,
	],
	templateUrl: './landing-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
	private readonly catalog = inject(AgentCatalogService);

	protected readonly stats = LANDING_STATS;
	protected readonly features = PLATFORM_FEATURES;
	protected readonly primaryCta = PRIMARY_LANDING_CTA;
	protected readonly contactCta = CONTACT_CTA;

	private readonly PREVIEW_SLUGS = ['producto', 'fronto', 'backo', 'testo', 'devopsy', 'securo'];

	protected readonly previewAgents = computed(() =>
		this.PREVIEW_SLUGS.map((slug) => this.catalog.getBySlug(slug)).filter((a): a is NonNullable<typeof a> => a != null),
	);
}
