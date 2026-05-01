import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import {
	PLAN_FEATURES,
	PLAN_NAMES,
	PLAN_PRICES,
	type PlanId,
} from '../../../../core/models/billing.models';

interface PlanCard {
	id: PlanId;
	name: string;
	price: number | null;
	summary: string;
	ctaLabel: string;
	ctaPath: string;
	popular: boolean;
}

@Component({
	selector: 'app-pricing-teaser',
	standalone: true,
	imports: [RouterLink, SectionHeadingComponent],
	templateUrl: './pricing-teaser.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingTeaserComponent {
	protected readonly plans: PlanCard[] = [
		{
			id: 'free',
			name: PLAN_NAMES.free,
			price: PLAN_PRICES.free,
			summary: `${PLAN_FEATURES.free.maxInstalledAgents} agents · ${PLAN_FEATURES.free.monthlyCredits} runs/month`,
			ctaLabel: 'Get started',
			ctaPath: '/dashboard',
			popular: false,
		},
		{
			id: 'pro',
			name: PLAN_NAMES.pro,
			price: PLAN_PRICES.pro,
			summary: `All core agents · ${PLAN_FEATURES.pro.monthlyCredits} credits`,
			ctaLabel: 'Start free trial',
			ctaPath: '/pricing',
			popular: false,
		},
		{
			id: 'team',
			name: PLAN_NAMES.team,
			price: PLAN_PRICES.team,
			summary: `${PLAN_FEATURES.team.maxSeats} seats · ${PLAN_FEATURES.team.monthlyCredits.toLocaleString()} credits`,
			ctaLabel: 'Start free trial',
			ctaPath: '/pricing',
			popular: true,
		},
		{
			id: 'enterprise',
			name: PLAN_NAMES.enterprise,
			price: PLAN_PRICES.enterprise,
			summary: 'Unlimited · SSO · SLA',
			ctaLabel: 'Contact sales',
			ctaPath: '/contact',
			popular: false,
		},
	];
}
