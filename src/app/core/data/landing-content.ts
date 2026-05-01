import type { CtaConfig, Feature, Stat } from '../models/site.models';

// ─── Existing data ────────────────────────────────────────────────────────────

export const LANDING_STATS: readonly Stat[] = [
	{ id: 's1', value: '55+', label: 'AI employees', hint: 'Across business functions' },
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
	eyebrow: 'Get started',
	title: 'Your AI workforce is one click away',
	subtitle:
		'Free forever for 2 agents. No setup, no credit card, no waiting. Install, run, and get work done.',
	primaryLabel: 'Start free — no login needed',
	primaryPath: '/workspace/producto',
	secondaryLabel: 'Book a demo',
	secondaryPath: '/demo',
};

export const CONTACT_CTA: CtaConfig = {
	eyebrow: 'Enterprise',
	title: 'Building at team or org scale?',
	subtitle:
		'Talk to us about custom agents, SSO, audit logs, and a dedicated deployment plan for your organization.',
	primaryLabel: 'Contact sales',
	primaryPath: '/contact',
	secondaryLabel: 'Explore agents',
	secondaryPath: '/agents',
};

// ─── New: Problem section ─────────────────────────────────────────────────────

export interface ProblemCard {
	icon: 'chat' | 'pile' | 'chain';
	title: string;
	description: string;
}

export const PROBLEM_CARDS: readonly ProblemCard[] = [
	{
		icon: 'chat',
		title: 'Generic AI gives generic output',
		description:
			'ChatGPT and Copilot are useful — but they don\'t know your stack, your role vocabulary, or how you ship. Every output needs rework.',
	},
	{
		icon: 'pile',
		title: 'Expert tasks pile up on senior people',
		description:
			'PRDs, API designs, QA strategies, pipeline configs — these require domain expertise. Your senior engineers can\'t do it all.',
	},
	{
		icon: 'chain',
		title: 'Handoffs create context loss',
		description:
			'When PM hands off to engineering, and engineering hands off to QA, critical context evaporates. Work gets rebuilt from scratch.',
	},
];

// ─── New: Solution section ────────────────────────────────────────────────────

export interface SolutionPillar {
	accentVar: string;
	title: string;
	description: string;
}

export const SOLUTION_PILLARS: readonly SolutionPillar[] = [
	{
		accentVar: '--accent-product',
		title: 'Hire by role',
		description:
			'Browse a marketplace of AI employees — Frontend Dev, Product Manager, DevOps Engineer, QA Lead. Each knows its domain.',
	},
	{
		accentVar: '--accent-engineering',
		title: 'Prompt once, get structured work',
		description:
			'No raw text dumps. Every agent returns structured output: overview, detailed steps, action items, follow-up questions.',
	},
	{
		accentVar: '--accent-operations',
		title: 'Chain agents together',
		description:
			'Let Producto draft the spec. Fronto designs the components. Testo builds the test plan. Context flows automatically.',
	},
	{
		accentVar: '--accent-leadership',
		title: 'Your team stays in control',
		description:
			'Review every output before acting. Edit, save, or hand off. AI does the expert drafting — humans own the decisions.',
	},
];

// ─── New: Differentiation section ────────────────────────────────────────────

export interface ComparisonRow {
	label: string;
	aief: string | boolean;
	chatbot: string | boolean;
	automation: string | boolean;
}

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
	{ label: 'Role-specific expertise', aief: true, chatbot: false, automation: 'Partial' },
	{ label: 'Structured output', aief: 'Always', chatbot: false, automation: 'But rigid' },
	{ label: 'Agent chaining', aief: 'With context', chatbot: false, automation: 'But no AI' },
	{ label: 'Installable by role', aief: true, chatbot: false, automation: false },
	{ label: 'Works like a team member', aief: true, chatbot: false, automation: false },
	{ label: 'Outputs you can act on', aief: true, chatbot: 'Sometimes', automation: true },
];

// ─── New: Use cases section ───────────────────────────────────────────────────

export interface UseCase {
	title: string;
	agents: string[];
	description: string;
	primarySlug: string;
	accentVar: string;
}

export const USE_CASES: readonly UseCase[] = [
	{
		title: 'Launch a new feature',
		agents: ['Producto', 'Fronto', 'Backo'],
		description: 'From idea to spec to API design — in one chain. Ship faster without losing alignment.',
		primarySlug: 'producto',
		accentVar: '--accent-product',
	},
	{
		title: 'Ship with confidence',
		agents: ['Testo', 'DevOpsy'],
		description: 'Test strategy and CI/CD pipeline, generated and handed off clean. Release without regressions.',
		primarySlug: 'testo',
		accentVar: '--accent-engineering',
	},
	{
		title: 'Lock down your stack',
		agents: ['Securo'],
		description: 'Security review and threat model for any API or architecture. Compliance-ready output.',
		primarySlug: 'securo',
		accentVar: '--accent-support',
	},
	{
		title: 'Accelerate onboarding',
		agents: ['Writeo', 'Doco'],
		description: 'Generate runbooks, onboarding docs, and ADRs from code and context in minutes.',
		primarySlug: 'writeo',
		accentVar: '--accent-knowledge',
	},
	{
		title: 'Plan your quarter',
		agents: ['Producto', 'Planno'],
		description: 'PRD, roadmap, and user stories — structured and ready for Linear, Jira, or Notion.',
		primarySlug: 'producto',
		accentVar: '--accent-operations',
	},
];

// ─── New: Testimonials ────────────────────────────────────────────────────────

export interface Testimonial {
	quote: string;
	author: string;
	company: string;
	role: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
	{
		quote: 'We replaced 3 days of spec writing with one Producto chain. The output went straight into our sprint planning.',
		author: 'Early access user',
		company: 'Series A startup',
		role: 'Head of Product',
	},
	{
		quote: "Fronto's component specs ship directly to Storybook. Our frontend team stopped writing boilerplate.",
		author: 'Early access user',
		company: 'Scale-up',
		role: 'Engineering Lead',
	},
	{
		quote: 'Our DevOpsy pipeline config just... worked. First try. That never happens.',
		author: 'Early access user',
		company: 'Enterprise pilot',
		role: 'Platform Engineer',
	},
];
