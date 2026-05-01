import type { PageSeo } from '../models/site.models';

/** Static SEO payloads attached to router `data.seo` for crawlable pages. */
export const ROUTE_SEO = {
	home: {
		title: 'AI Employee Force — Build your AI workforce',
		description:
			'Hire specialized AI employees, orchestrate multi-agent execution, and govern AI-native operations at enterprise scale.',
		canonicalPath: '/',
	} satisfies PageSeo,

	agents: {
		title: 'Agent marketplace — AI Employee Force',
		description:
			'Browse role-based AI employees across engineering, product, leadership, operations, support, knowledge, and finance.',
		canonicalPath: '/agents',
	} satisfies PageSeo,

	/** Placeholder for `/agents/:slug` until the profile component sets agent-specific meta. */
	agentProfile: {
		title: 'Agent profile — AI Employee Force',
		description:
			'Review responsibilities, tools, skill stack, and deployment-ready use cases for this AI employee profile.',
		robots: 'index, follow',
	} satisfies PageSeo,

	about: {
		title: 'About — AI Employee Force',
		description:
			'Our mission is to help enterprises deploy role-based AI employees with orchestration, governance, and marketplace scale.',
		canonicalPath: '/about',
	} satisfies PageSeo,

	demo: {
		title: 'Request a demo — AI Employee Force',
		description:
			'Schedule a walkthrough of the AI Employee Force marketplace, orchestration layer, and enterprise governance controls.',
		canonicalPath: '/demo',
	} satisfies PageSeo,

	contact: {
		title: 'Contact — AI Employee Force',
		description:
			'Reach the AI Employee Force team for enterprise evaluations, security reviews, and deployment planning.',
		canonicalPath: '/contact',
	} satisfies PageSeo,

	notFound: {
		title: 'Page not found — AI Employee Force',
		description: 'The page you requested does not exist. Explore the platform or browse the agent marketplace.',
		robots: 'noindex, nofollow',
	} satisfies PageSeo,

	dashboard: {
		title: 'Dashboard — AI Employee Force',
		description:
			'Launch agents, review recent runs, and manage your installed AI employee roster from your personal workspace dashboard.',
		canonicalPath: '/dashboard',
	} satisfies PageSeo,

	workspace: {
		title: 'Agent workspace — AI Employee Force',
		description:
			'Run prompts, explore structured outputs, and take action with your deployed AI employee in a dedicated workspace.',
		robots: 'noindex, nofollow',
	} satisfies PageSeo,

	runs: {
		title: 'Run history — AI Employee Force',
		description:
			'Review all previous agent runs, filter by status, and reopen any session to continue where you left off.',
		canonicalPath: '/runs',
	} satisfies PageSeo,

	pricing: {
		title: 'Pricing — AI Employee Force',
		description:
			'Simple, transparent pricing for your AI workforce. Start free, scale with Pro or Team, or talk to us about Enterprise.',
		canonicalPath: '/pricing',
	} satisfies PageSeo,

	billing: {
		title: 'Billing — AI Employee Force',
		description: 'Manage your subscription, monitor credit usage, and view billing history.',
		robots: 'noindex, nofollow',
	} satisfies PageSeo,
} as const;
