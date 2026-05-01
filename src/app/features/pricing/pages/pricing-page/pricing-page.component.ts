import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CREDIT_TOP_UPS, PLAN_FEATURES, PLAN_PRICES, type PlanId } from '../../../../core/models/billing.models';

interface PricingTier {
	id: PlanId;
	name: string;
	price: number | null;
	annualPrice: number | null;
	description: string;
	ctaLabel: string;
	ctaPath: string;
	popular: boolean;
}

interface FeatureRow {
	label: string;
	free: string | boolean;
	pro: string | boolean;
	team: string | boolean;
	enterprise: string | boolean;
}

interface FeatureGroup {
	title: string;
	rows: FeatureRow[];
}

interface FaqItem {
	q: string;
	a: string;
}

const TIERS: PricingTier[] = [
	{
		id: 'free',
		name: 'Free',
		price: 0,
		annualPrice: 0,
		description: 'Start building with 2 agents and 20 runs per month. No credit card required.',
		ctaLabel: 'Get started free',
		ctaPath: '/dashboard',
		popular: false,
	},
	{
		id: 'pro',
		name: 'Pro',
		price: 29,
		annualPrice: 24,
		description: 'All 6 base agents, 600 credits/month, streaming, and chains.',
		ctaLabel: 'Start Pro trial',
		ctaPath: '/dashboard',
		popular: false,
	},
	{
		id: 'team',
		name: 'Team',
		price: 99,
		annualPrice: 83,
		description: 'Up to 3 seats, 3,000 credits/month, premium agents, and priority queue.',
		ctaLabel: 'Start Team trial',
		ctaPath: '/dashboard',
		popular: true,
	},
	{
		id: 'enterprise',
		name: 'Enterprise',
		price: null,
		annualPrice: null,
		description: 'Custom agents, unlimited credits, SSO, audit logs, and a dedicated CSM.',
		ctaLabel: 'Contact sales',
		ctaPath: '/contact',
		popular: false,
	},
];

const FEATURE_GROUPS: FeatureGroup[] = [
	{
		title: 'Core Usage',
		rows: [
			{ label: 'Monthly credits', free: '20', pro: '600', team: '3,000', enterprise: 'Unlimited' },
			{ label: 'Agent runs/mo', free: '20', pro: '300', team: '1,500', enterprise: 'Unlimited' },
			{ label: 'Chain runs/mo', free: '0', pro: '30', team: '150', enterprise: 'Unlimited' },
			{ label: 'Run history retention', free: '7 days', pro: '90 days', team: '1 year', enterprise: 'Unlimited' },
			{ label: 'Streaming (SSE)', free: false, pro: true, team: true, enterprise: true },
		],
	},
	{
		title: 'Agents',
		rows: [
			{ label: 'Free agents (Fronto, Producto)', free: true, pro: true, team: true, enterprise: true },
			{ label: 'Pro agents (Backo, Stacko, DevOpsy, Testo)', free: false, pro: true, team: true, enterprise: true },
			{ label: 'Premium agents (future)', free: false, pro: false, team: true, enterprise: true },
			{ label: 'Custom private agents', free: false, pro: false, team: false, enterprise: true },
			{ label: 'Installed agent slots', free: '3', pro: '15', team: 'Unlimited', enterprise: 'Unlimited' },
		],
	},
	{
		title: 'Collaboration',
		rows: [
			{ label: 'Workspace seats', free: '1', pro: '1', team: '3 (+ $25/seat)', enterprise: 'Custom' },
			{ label: 'Priority queue', free: false, pro: false, team: true, enterprise: true },
			{ label: 'Shared workspace', free: false, pro: false, team: true, enterprise: true },
		],
	},
	{
		title: 'Security & Compliance',
		rows: [
			{ label: 'SSO / SAML', free: false, pro: false, team: false, enterprise: true },
			{ label: 'Audit logs', free: false, pro: false, team: false, enterprise: true },
			{ label: 'SLA', free: false, pro: false, team: '99.5%', enterprise: '99.9%+' },
			{ label: 'Dedicated CSM', free: false, pro: false, team: false, enterprise: true },
		],
	},
];

const FAQS: FaqItem[] = [
	{
		q: 'What is a credit?',
		a: 'One credit is the atomic unit of agent usage. A simple run costs 1 credit, a chain step costs 2, and streaming costs 2. Premium agent runs cost 3 credits.',
	},
	{
		q: 'Do unused credits roll over?',
		a: 'Free plan credits expire at the end of each month. Pro plans roll over up to 10% of unused credits. Team plans roll over up to 20%.',
	},
	{
		q: 'Can I upgrade or downgrade at any time?',
		a: 'Yes. You can upgrade immediately. Downgrading takes effect at the end of your current billing period.',
	},
	{
		q: 'Is there a free trial for paid plans?',
		a: 'Yes — Pro and Team plans include a 14-day free trial. No credit card required to start.',
	},
	{
		q: 'What happens if I run out of credits?',
		a: 'Your runs are paused and you see an upgrade prompt. You can purchase a top-up pack or upgrade your plan. We never auto-charge for overages.',
	},
	{
		q: 'Can I remove the "Generated with AI Employee Force" footer on Free?',
		a: 'The attribution footer can be removed on Team and Enterprise plans.',
	},
];

@Component({
	selector: 'app-pricing-page',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './pricing-page.component.html',
})
export class PricingPageComponent {
	protected readonly tiers = TIERS;
	protected readonly featureGroups = FEATURE_GROUPS;
	protected readonly faqs = FAQS;
	protected readonly topUps = CREDIT_TOP_UPS;
	protected readonly isAnnual = signal(false);
	protected readonly openFaq = signal<number | null>(null);

	protected getPrice(tier: PricingTier): number | null {
		return this.isAnnual() ? tier.annualPrice : tier.price;
	}

	protected toggleFaq(index: number): void {
		this.openFaq.update((current) => (current === index ? null : index));
	}
}
