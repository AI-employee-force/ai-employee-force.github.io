export interface PromptTemplate {
	id: string;
	label: string;
	agentSlug: string;
	icon: string;
	prompt: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
	{
		id: 'saas',
		label: 'Build SaaS',
		agentSlug: 'producto',
		icon: '🚀',
		prompt:
			'Build a SaaS product for AI workforce management — agents hired by role, structured outputs, and multi-agent chaining.',
	},
	{
		id: 'ui',
		label: 'Design UI',
		agentSlug: 'fronto',
		icon: '🎨',
		prompt:
			'Design the Angular UI components for the agent marketplace — agent cards, workspace layout, and chain breadcrumb.',
	},
	{
		id: 'api',
		label: 'Create API',
		agentSlug: 'backo',
		icon: '⚡',
		prompt:
			'Design a REST API contract for the AI employee workforce platform — agent runs, user auth, billing, and chain orchestration.',
	},
	{
		id: 'test',
		label: 'Write test cases',
		agentSlug: 'testo',
		icon: '✅',
		prompt:
			'Generate a comprehensive test plan for the agent marketplace — unit tests, integration tests, and E2E flows.',
	},
];
