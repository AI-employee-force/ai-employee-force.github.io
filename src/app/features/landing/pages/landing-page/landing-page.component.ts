import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import {
	CONTACT_CTA,
	LANDING_STATS,
	PLATFORM_FEATURES,
	PRIMARY_LANDING_CTA,
} from '../../../../core/data/landing-content';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { AgentCardComponent } from '../../../../shared/components/agent-card/agent-card.component';
import { FeatureCardComponent } from '../../../../shared/components/feature-card/feature-card.component';
import { CtaSectionComponent } from '../../../../shared/components/cta-section/cta-section.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-landing-page',
	imports: [
		SectionHeadingComponent,
		StatCardComponent,
		AgentCardComponent,
		FeatureCardComponent,
		CtaSectionComponent,
		PrimaryButtonComponent,
		RevealOnScrollDirective,
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

	protected readonly previewAgents = computed(() => this.catalog.getAll().slice(0, 6));
}
