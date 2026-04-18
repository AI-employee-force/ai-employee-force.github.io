import type { CtaConfig, Feature, Stat } from '../models/site.models';

export const LANDING_STATS: readonly Stat[] = [
	{ id: 's1', value: '50+', label: 'Role templates', hint: 'Across business functions' },
	{ id: 's2', value: 'SOC2-ready', label: 'Control posture', hint: 'Governance workflows' },
	{ id: 's3', value: '24/7', label: 'Orchestration', hint: 'Policy-aware execution' },
	{ id: 's4', value: 'Multi-tenant', label: 'Enterprise isolation', hint: 'Data & access boundaries' },
];

export const PLATFORM_FEATURES: readonly Feature[] = [
	{
		id: 'f1',
		title: 'Workforce orchestration',
		description:
			'Coordinate agents, humans, and systems with policies, approvals, and audit trails — not ad-hoc prompts.',
		icon: 'orchestrate',
	},
	{
		id: 'f2',
		title: 'Agent marketplace',
		description:
			'Discover specialized AI employees by role, deploy to environments, and manage versions like product SKUs.',
		icon: 'marketplace',
	},
	{
		id: 'f3',
		title: 'Enterprise governance',
		description:
			'Data residency, access scopes, model routing, and evaluation hooks designed for regulated teams.',
		icon: 'governance',
	},
	{
		id: 'f4',
		title: 'Role-based execution',
		description:
			'Agents inherit responsibilities, tools, and escalation paths that mirror how your org actually works.',
		icon: 'roles',
	},
	{
		id: 'f5',
		title: 'Observability & audit',
		description:
			'Trace decisions, tool calls, and outcomes with exportable evidence for security and compliance reviews.',
		icon: 'audit',
	},
	{
		id: 'f6',
		title: 'Scale without sprawl',
		description:
			'Shared identity, billing, and lifecycle management so AI headcount stays governable as adoption grows.',
		icon: 'scale',
	},
];

export const PRIMARY_LANDING_CTA: CtaConfig = {
	eyebrow: 'Ready to deploy',
	title: 'Build your AI workforce with enterprise control',
	subtitle:
		'See how teams deploy role-based agents, orchestrate execution, and keep governance in the loop — without slowing product velocity.',
	primaryLabel: 'Request a demo',
	primaryPath: '/demo',
	secondaryLabel: 'Browse agents',
	secondaryPath: '/agents',
};

export const CONTACT_CTA: CtaConfig = {
	eyebrow: 'Talk to us',
	title: 'Bring AI Employee Force to your organization',
	subtitle:
		'We help enterprises move from experiments to governed, repeatable AI execution across departments.',
	primaryLabel: 'Schedule a conversation',
	primaryPath: '/contact',
	secondaryLabel: 'View platform',
	secondaryPath: '/',
};
