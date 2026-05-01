import type {
	Run,
	InstalledAgent,
	StarterPrompt,
	WorkspaceOutput,
	ProductoRunOutput,
	FrontoRunOutput,
	TestoRunOutput,
	TypedAgentOutput,
} from '../models/workspace.models';

// ─── Runs (10 items) ─────────────────────────────────────────────────────────

export const MOCK_RUNS: readonly Run[] = [
	{
		id: 'run-001',
		agentSlug: 'fronto',
		agentName: 'Fronto',
		agentCategory: 'engineering',
		promptPreview: 'Generate a component spec for a date-range picker with accessibility notes',
		fullPrompt:
			'Generate a component spec for a date-range picker with accessibility notes, including ARIA attributes, keyboard navigation, and contrast ratios for both light and dark mode.',
		status: 'completed',
		timestamp: '2026-04-28T09:14:00Z',
		outputSummary:
			'Produced a 3-section spec: anatomy, accessibility requirements, and implementation checklist.',
	},
	{
		id: 'run-002',
		agentSlug: 'backo',
		agentName: 'Backo',
		agentCategory: 'engineering',
		promptPreview: 'Design a REST API contract for a multi-tenant notification service',
		fullPrompt:
			'Design a REST API contract for a multi-tenant notification service. Include endpoint definitions, auth headers, pagination, and error schema.',
		status: 'completed',
		timestamp: '2026-04-28T08:47:00Z',
		outputSummary:
			'OpenAPI-style contract with 6 endpoints, JWT auth header spec, and error taxonomy.',
	},
	{
		id: 'run-003',
		agentSlug: 'producto',
		agentName: 'Producto',
		agentCategory: 'product',
		promptPreview: 'Draft a PRD for AI-powered search with semantic ranking',
		fullPrompt:
			'Draft a PRD for AI-powered search with semantic ranking. Cover problem statement, success metrics, user stories, and non-goals.',
		status: 'running',
		timestamp: '2026-04-28T10:02:00Z',
	},
	{
		id: 'run-004',
		agentSlug: 'stacko',
		agentName: 'Stacko',
		agentCategory: 'engineering',
		promptPreview: 'Outline a migration plan from monolith to services for billing module',
		fullPrompt:
			'Outline a migration plan from a Rails monolith to independent services for the billing module. Include risk analysis and rollback strategy.',
		status: 'completed',
		timestamp: '2026-04-27T16:30:00Z',
		outputSummary:
			'Four-phase plan: extract boundaries, add anti-corruption layer, parallel run, cutover.',
	},
	{
		id: 'run-005',
		agentSlug: 'devopsy',
		agentName: 'DevOpsy',
		agentCategory: 'engineering',
		promptPreview: 'Create a GitHub Actions pipeline for Node.js with security scanning',
		fullPrompt:
			'Create a GitHub Actions CI/CD pipeline for a Node.js app that includes dependency audit, SAST scanning, Docker build, and staging deploy gate.',
		status: 'failed',
		timestamp: '2026-04-27T14:10:00Z',
	},
	{
		id: 'run-006',
		agentSlug: 'finova',
		agentName: 'Finova',
		agentCategory: 'finance',
		promptPreview: 'Summarize Q1 variance report and flag anomalies above 8%',
		fullPrompt:
			'Summarize the Q1 variance report for the SaaS business unit and flag all line items where actuals deviate more than 8% from budget.',
		status: 'completed',
		timestamp: '2026-04-27T11:20:00Z',
		outputSummary:
			'Identified 4 flagged line items; cloud infrastructure over by 14%, headcount under by 6%.',
	},
	{
		id: 'run-007',
		agentSlug: 'supporto',
		agentName: 'Supporto',
		agentCategory: 'support',
		promptPreview: 'Generate a customer escalation response for billing dispute #BL-2941',
		fullPrompt:
			'Generate a professional customer escalation response for billing dispute ticket #BL-2941. Tone: empathetic, concise, resolution-focused.',
		status: 'completed',
		timestamp: '2026-04-26T15:55:00Z',
		outputSummary:
			'Three-paragraph response with apology, root cause explanation, and credit offer.',
	},
	{
		id: 'run-008',
		agentSlug: 'producto',
		agentName: 'Producto',
		agentCategory: 'product',
		promptPreview: 'Write release notes for the v2.4 notification center overhaul',
		fullPrompt:
			'Write polished external release notes for the v2.4 notification center overhaul for our B2B SaaS product. Audience: technical admins and end users.',
		status: 'failed',
		timestamp: '2026-04-26T09:30:00Z',
	},
	{
		id: 'run-009',
		agentSlug: 'fronto',
		agentName: 'Fronto',
		agentCategory: 'engineering',
		promptPreview: 'Review accessibility audit for the onboarding flow and suggest fixes',
		fullPrompt:
			'Review the accessibility audit findings for our onboarding flow and suggest specific code-level fixes, prioritized by WCAG level (A first, then AA).',
		status: 'completed',
		timestamp: '2026-04-25T13:40:00Z',
		outputSummary:
			'Twelve issues catalogued; top 3 critical: missing form labels, color-contrast failure, focus trap.',
	},
	{
		id: 'run-010',
		agentSlug: 'backo',
		agentName: 'Backo',
		agentCategory: 'engineering',
		promptPreview: 'Write integration tests for the payment webhook handler',
		fullPrompt:
			'Write integration tests for the Stripe payment webhook handler. Cover: signature validation, idempotency, retry edge cases, and failure rollback.',
		status: 'completed',
		timestamp: '2026-04-24T17:05:00Z',
		outputSummary: 'Test suite outline with 8 scenarios across 3 test categories.',
	},
];

// ─── Installed agents (6 items) ──────────────────────────────────────────────

export const MOCK_INSTALLED_AGENTS: readonly InstalledAgent[] = [
	{ slug: 'fronto', installedAt: '2026-03-10T08:00:00Z', lastRunAt: '2026-04-28T09:14:00Z', runCount: 24 },
	{ slug: 'backo', installedAt: '2026-03-10T08:00:00Z', lastRunAt: '2026-04-28T08:47:00Z', runCount: 18 },
	{ slug: 'producto', installedAt: '2026-03-15T10:30:00Z', lastRunAt: '2026-04-28T10:02:00Z', runCount: 31 },
	{ slug: 'stacko', installedAt: '2026-03-22T09:00:00Z', lastRunAt: '2026-04-27T16:30:00Z', runCount: 9 },
	{ slug: 'devopsy', installedAt: '2026-04-01T11:00:00Z', lastRunAt: '2026-04-27T14:10:00Z', runCount: 6 },
	{ slug: 'finova', installedAt: '2026-04-12T14:00:00Z', lastRunAt: '2026-04-27T11:20:00Z', runCount: 4 },
];

// ─── Starter prompts per agent slug ─────────────────────────────────────────

export const STARTER_PROMPTS: Readonly<Record<string, StarterPrompt[]>> = {
	fronto: [
		{
			id: 'sp-fronto-1',
			label: 'Component spec',
			text: 'Write a detailed component specification for a data table with sorting, pagination, and row selection.',
		},
		{
			id: 'sp-fronto-2',
			label: 'Accessibility audit',
			text: 'Review our current design system button components and list all WCAG 2.1 AA failures with suggested fixes.',
		},
		{
			id: 'sp-fronto-3',
			label: 'Performance review',
			text: 'Analyze the main bundle and suggest three quick wins to reduce initial load time by at least 20%.',
		},
		{
			id: 'sp-fronto-4',
			label: 'Migration plan',
			text: 'Draft a step-by-step plan to migrate our Angular 15 app to Angular 20 with standalone components.',
		},
		{
			id: 'sp-fronto-5',
			label: 'Design tokens',
			text: 'Create a design token schema in JSON for a brand refresh covering colors, typography, spacing, and radius.',
		},
	],
	backo: [
		{
			id: 'sp-backo-1',
			label: 'API contract',
			text: 'Design a REST API contract for a user management service with RBAC, including all endpoint definitions.',
		},
		{
			id: 'sp-backo-2',
			label: 'Database schema',
			text: 'Design a PostgreSQL schema for a multi-tenant SaaS billing system with usage tracking and invoicing.',
		},
		{
			id: 'sp-backo-3',
			label: 'Integration tests',
			text: 'Write integration test cases for our payment webhook handler covering signature validation and idempotency.',
		},
		{
			id: 'sp-backo-4',
			label: 'Service boundary',
			text: 'Identify service boundaries for extracting our notification logic into a standalone microservice.',
		},
		{
			id: 'sp-backo-5',
			label: 'Caching strategy',
			text: 'Recommend a Redis caching strategy for our product catalog API that handles 10k requests per second.',
		},
	],
	producto: [
		{
			id: 'sp-producto-0',
			label: 'AI workforce SaaS',
			text: 'Build a SaaS product for AI workforce management — agents hired by role, structured outputs, and multi-agent chaining.',
		},
		{
			id: 'sp-producto-1',
			label: 'PRD template',
			text: 'Draft a PRD for an AI-powered in-app search feature with semantic ranking and personalization.',
		},
		{
			id: 'sp-producto-2',
			label: 'Release notes',
			text: 'Write external-facing release notes for our v3.0 dashboard redesign aimed at technical and non-technical users.',
		},
		{
			id: 'sp-producto-3',
			label: 'User story map',
			text: 'Create a user story map for the onboarding flow of a new enterprise customer from signup to first value.',
		},
		{
			id: 'sp-producto-4',
			label: 'Competitive brief',
			text: 'Write a competitive positioning brief comparing our platform to Salesforce Einstein and Microsoft Copilot.',
		},
		{
			id: 'sp-producto-5',
			label: 'OKR draft',
			text: 'Draft Q3 OKRs for a product team focused on enterprise retention and expansion revenue.',
		},
	],
	stacko: [
		{
			id: 'sp-stacko-1',
			label: 'Architecture review',
			text: 'Review our current full-stack architecture and identify the top 3 scalability bottlenecks.',
		},
		{
			id: 'sp-stacko-2',
			label: 'Migration plan',
			text: 'Outline a migration plan for our billing module from a Rails monolith to an independent Node.js service.',
		},
		{
			id: 'sp-stacko-3',
			label: 'Tech debt audit',
			text: 'Audit our tech debt backlog and prioritize items by business risk and estimated effort.',
		},
		{
			id: 'sp-stacko-4',
			label: 'Vertical feature',
			text: 'Plan the full vertical slice — DB to UI — for a usage-based billing alert feature.',
		},
		{
			id: 'sp-stacko-5',
			label: 'Code review',
			text: 'Review the attached pull request diff and provide actionable, constructive feedback by category.',
		},
	],
	devopsy: [
		{
			id: 'sp-devopsy-1',
			label: 'CI/CD pipeline',
			text: 'Create a GitHub Actions pipeline for a Node.js app with SAST scanning, Docker build, and staging deploy gate.',
		},
		{
			id: 'sp-devopsy-2',
			label: 'Terraform module',
			text: 'Write a reusable Terraform module for an AWS ECS service with auto-scaling and ALB integration.',
		},
		{
			id: 'sp-devopsy-3',
			label: 'Incident runbook',
			text: 'Create an on-call runbook for a P1 database connection pool exhaustion incident.',
		},
		{
			id: 'sp-devopsy-4',
			label: 'Observability',
			text: 'Design a Datadog dashboard and alerting strategy for our API gateway covering latency, errors, and throughput.',
		},
		{
			id: 'sp-devopsy-5',
			label: 'K8s config',
			text: 'Write Kubernetes manifests for a stateless API service with HPA, resource limits, and a liveness probe.',
		},
	],
	finova: [
		{
			id: 'sp-finova-1',
			label: 'Variance report',
			text: 'Summarize the Q1 budget variance report and flag all line items deviating more than 8% from plan.',
		},
		{
			id: 'sp-finova-2',
			label: 'Forecast model',
			text: 'Build a 12-month ARR forecast model structure for a SaaS business at $10M ARR with 15% monthly growth.',
		},
		{
			id: 'sp-finova-3',
			label: 'Cost analysis',
			text: 'Analyze our cloud infrastructure costs and identify the top 5 optimization opportunities.',
		},
		{
			id: 'sp-finova-4',
			label: 'Board deck',
			text: 'Draft the finance section of a board deck for Q2 covering revenue, burn, and key SaaS metrics.',
		},
		{
			id: 'sp-finova-5',
			label: 'Headcount plan',
			text: 'Create a headcount planning model for an engineering org growing from 30 to 50 engineers in 12 months.',
		},
	],
};

// ─── Mock output templates per agent slug ────────────────────────────────────

export const MOCK_OUTPUT_TEMPLATES: Readonly<Record<string, WorkspaceOutput>> = {
	fronto: {
		overview:
			'Fronto has analyzed your request and produced a structured specification covering component anatomy, interaction states, accessibility requirements, and implementation guidance. All outputs align with WCAG 2.1 AA and your existing design token schema.',
		details: [
			'Component anatomy: container, trigger, calendar popover, date inputs, clear button, apply button',
			'ARIA roles: combobox on trigger, dialog on popover, grid on calendar month view',
			'Keyboard support: Tab to focus trigger, Enter/Space to open, Arrow keys for date navigation, Escape to close',
			'Color contrast ratios: all interactive states pass 4.5:1 against dark and light backgrounds',
			'Design tokens required: --color-surface-overlay, --radius-popover, --shadow-floating',
			'Responsive breakpoints: full popover on ≥640px; stacked month view on <640px',
		],
		actions: [
			'Implement DateRangePickerComponent using your design token schema',
			'Add unit tests for keyboard navigation state machine',
			'Add integration tests for screen reader announcement of selected range',
			'Document usage examples in Storybook',
			'Review with design team before engineering sprint start',
		],
		followUps: [
			'Should I write the Angular component implementation?',
			'Want me to draft the Storybook story file?',
			'Shall I produce the Figma annotation spec?',
		],
	},
	backo: {
		overview:
			'Backo has drafted a complete REST API contract for your service. The design uses resource-oriented endpoints, JWT bearer authentication, cursor-based pagination, and a consistent problem+json error envelope. All non-idempotent operations include idempotency key support.',
		details: [
			'POST /notifications — create notification event (idempotency-key required)',
			'GET /notifications?cursor=&limit= — list with cursor pagination, up to 100 per page',
			'GET /notifications/{id} — single notification with full payload',
			'PATCH /notifications/{id}/read — mark as read (idempotent)',
			'DELETE /notifications/{id} — soft-delete, 204 No Content',
			'GET /notifications/preferences — per-user channel preferences',
			'Auth: Authorization: Bearer <jwt> with tenant_id claim enforced at gateway',
			'Error schema: RFC 7807 problem+json with type, title, status, detail, instance',
		],
		actions: [
			'Register contract in your internal API catalogue',
			'Generate TypeScript SDK types from the OpenAPI spec',
			'Set up contract tests against staging environment',
			'Implement idempotency-key deduplication in the handler',
		],
		followUps: [
			'Want the full OpenAPI 3.1 YAML for this contract?',
			'Should I design the event schema for a Kafka-based version?',
			'Shall I write the TypeScript request/response types?',
		],
	},
	producto: {
		overview:
			'Producto has framed the problem, shaped the solution space, and produced a structured PRD outline. Scope is tightly bounded to the stated user need with explicit non-goals to prevent scope creep. Success metrics are tied to observable user behavior, not vanity numbers.',
		details: [
			'Problem statement: users abandon search after <2 results due to keyword mismatch',
			'Success metrics: search-to-click rate ≥ 35%, zero-results rate < 5%, P75 latency < 200ms',
			'User stories: 4 primary stories covering discovery, refinement, personalization, and fallback',
			'Non-goals: voice search, image search, cross-tenant federation',
			'Dependencies: ML platform team for embedding model, Data team for index pipeline',
			'Proposed milestones: spike (2w), MVP (6w), personalization layer (4w)',
		],
		actions: [
			'Validate success metrics with analytics team before committing',
			'Run discovery interviews to confirm the keyword mismatch hypothesis',
			'Create Linear epic and break down user stories into engineering tasks',
			'Schedule cross-functional kickoff with ML, Data, and Design',
		],
		followUps: [
			'Want me to write the full PRD document?',
			'Should I draft the Linear epic and sub-tasks?',
			'Shall I produce a competitive analysis for semantic search?',
		],
	},
	default: {
		overview:
			'The agent has completed your request and produced structured output covering the key dimensions of the problem. Review the Details tab for granular findings and the Actions tab for next steps.',
		details: [
			'Primary analysis complete across all specified dimensions',
			'Key dependencies identified and ranked by impact',
			'Risk factors evaluated with mitigation options',
			'Recommended approach selected based on your stated constraints',
			'Timeline estimate: 3–5 business days with one engineer',
		],
		actions: [
			'Review the primary recommendation with your team',
			'Prioritize the identified quick wins for immediate execution',
			'Schedule a follow-up session to tackle the longer-term items',
			'Document decisions in your project tracking system',
		],
		followUps: [
			'Want me to elaborate on any specific section?',
			'Should I draft an implementation checklist?',
			'Shall I produce a stakeholder communication summary?',
		],
	},
};

// ─── Typed runner outputs (MockAgentRunnerService) ───────────────────────────

interface AgentRunOutputEntry {
	typed: TypedAgentOutput;
	workspace: WorkspaceOutput;
}

const _PRODUCTO_TYPED: ProductoRunOutput = {
	productSummary:
		'Producto has scoped the AI Workforce Management SaaS. The platform lets teams hire specialist AI employees by role — product managers, frontend engineers, QA leads — give them a prompt, and receive structured, actionable output ready to hand off. Agent chains pass context automatically between roles, eliminating the handoff problem that kills execution speed.',
	features: [
		{
			title: 'Agent marketplace',
			description:
				'Browse and install AI employees by role. Each agent has a defined capability set, output format, and escalation path — hire like a product SKU, not a chatbot.',
		},
		{
			title: 'Structured work output',
			description:
				'Every agent returns structured output: overview, detailed findings, action items, and follow-up questions. No raw text — output is ready to act on immediately.',
		},
		{
			title: 'Multi-agent chaining',
			description:
				'Chain Producto → Fronto → Testo and context flows automatically. PRD becomes component spec becomes test plan — without copy-paste handoffs.',
		},
		{
			title: 'Enterprise governance',
			description:
				'Role-scoped permissions, audit trails, human-in-the-loop gates, and data residency controls. Built for regulated teams from day one.',
		},
	],
	roadmap: [
		{
			phase: 'Q2 2026 — MVP',
			items: [
				'Launch marketplace with Producto, Fronto, Testo as free-tier agents',
				'Implement agent chaining: Producto → Fronto → Testo with context synthesis',
				'Ship structured output viewer (Overview / Details / Actions tabs)',
				'Release credit-based billing: Free (20 runs), Pro ($29/mo, 600 credits)',
			],
		},
		{
			phase: 'Q3 2026 — Scale',
			items: [
				'Expand catalog to 55+ agents across engineering, product, ops, and finance',
				'Orchestration layer: parallel chains, approval gates, policy enforcement',
				'Team plan ($99/mo, 3 seats, 3,000 credits) with shared run history',
				'Enterprise tier: SSO, audit export, custom agent deployment',
			],
		},
	],
};

const _FRONTO_TYPED: FrontoRunOutput = {
	uiComponents: [
		{
			name: 'DataTable',
			description:
				'Sortable, paginated table with row selection, bulk actions, and virtual scrolling for large datasets.',
			props: ['rows: T[]', 'columns: ColumnDef<T>[]', 'selectable?: boolean', 'pageSize?: number'],
		},
		{
			name: 'CommandPalette',
			description:
				'Keyboard-triggered overlay for global search and action dispatch, inspired by VS Code and Linear.',
			props: ['commands: Command[]', 'placeholder?: string', 'shortcut?: string'],
		},
		{
			name: 'StatusBadge',
			description:
				'Semantic status indicator with icon, label, and color variants for idle, loading, success, warning, and error states.',
			props: ['status: StatusVariant', 'size?: "sm" | "md"', 'pulse?: boolean'],
		},
		{
			name: 'SplitPane',
			description:
				'Resizable two-panel layout with drag handle, min/max constraints, and collapse support for dense workspace UIs.',
			props: ['direction: "horizontal" | "vertical"', 'defaultRatio?: number', 'minSize?: number'],
		},
	],
	layout: [
		{
			region: 'App shell',
			description: 'Fixed 64px header + full-height sidebar (240px) + scrollable main content area.',
		},
		{
			region: 'Sidebar nav',
			description:
				'Icon-label nav items grouped by section; collapses to icon-only at < 1024px viewport.',
		},
		{
			region: 'Content canvas',
			description: 'Max-width 1200px, centered, 20px horizontal padding, 32px top padding.',
		},
		{
			region: 'Action bar',
			description:
				'Sticky bottom bar for bulk/contextual actions; only renders when items are selected.',
		},
		{
			region: 'Panel overlay',
			description:
				'Right-side slide-in panel (480px) for detail views, replacing full-page navigation for dense workflows.',
		},
	],
	designSystem: [
		{
			token: '--color-surface-elevated',
			value: 'oklch(99% 0 0 / 0.7)',
			usage: 'Card and panel backgrounds with backdrop blur',
		},
		{
			token: '--color-accent-primary',
			value: 'oklch(65% 0.22 250)',
			usage: 'Primary CTA buttons, active nav indicators, focus rings',
		},
		{
			token: '--radius-card',
			value: '1.375rem',
			usage: 'All card-level surface rounding (22px)',
		},
		{
			token: '--shadow-panel',
			value: '0 8px 40px -12px rgb(0 0 0 / 0.14)',
			usage: 'Elevated panels and popovers',
		},
	],
};

const _TESTO_TYPED: TestoRunOutput = {
	testCases: [
		{
			id: 'TC-001',
			title: 'Successful form submission with valid inputs',
			steps: [
				'Navigate to the target form',
				'Fill all required fields with valid data',
				'Submit the form',
				'Observe the response',
			],
			expected: 'Form submits successfully, success message displayed, data persisted.',
		},
		{
			id: 'TC-002',
			title: 'Form validation rejects empty required fields',
			steps: [
				'Navigate to the target form',
				'Leave one or more required fields empty',
				'Attempt to submit',
			],
			expected:
				'Submission blocked, each empty required field shows an inline error message with ARIA role="alert".',
		},
		{
			id: 'TC-003',
			title: 'Session timeout triggers re-authentication',
			steps: [
				'Log in and remain idle for session timeout period',
				'Attempt any authenticated action',
			],
			expected:
				'User is redirected to login, return URL is preserved, session data is cleared.',
		},
		{
			id: 'TC-004',
			title: 'Concurrent edit conflict is surfaced to the user',
			steps: [
				'Open the same record in two browser tabs',
				'Edit and save in tab A',
				'Edit and attempt to save in tab B',
			],
			expected:
				'Tab B receives a conflict error; user is shown a diff and offered merge or discard options.',
		},
	],
	edgeCases: [
		'Maximum field length boundary: submit with exactly max-length string and with max+1 characters',
		'Unicode input: emoji, RTL characters, and zero-width joiners in text fields',
		'Rapid double-submit: clicking the submit button twice in under 300ms',
		'Network interruption mid-submit: connection drops after request is sent but before response',
		'Expired CSRF token: submit after leaving the form open for longer than the token TTL',
	],
	qaChecklist: [
		{ item: 'All form inputs have associated <label> elements or aria-label', priority: 'high' },
		{ item: 'Focus order follows logical reading order (Tab sequence test)', priority: 'high' },
		{ item: 'Error messages are programmatically associated with their inputs', priority: 'high' },
		{ item: 'Success and error states are announced to screen readers via aria-live', priority: 'high' },
		{ item: 'All interactive elements have a visible focus indicator meeting 3:1 contrast ratio', priority: 'medium' },
		{ item: 'Mobile viewport (375px) renders without horizontal scroll', priority: 'medium' },
	],
};

export const AGENT_RUN_OUTPUTS: Readonly<Record<string, AgentRunOutputEntry>> = {
	producto: {
		typed: _PRODUCTO_TYPED,
		workspace: {
			overview: _PRODUCTO_TYPED.productSummary,
			details: _PRODUCTO_TYPED.features.map((f) => `${f.title}: ${f.description}`),
			actions: _PRODUCTO_TYPED.roadmap.flatMap((r) => r.items.map((i) => `[${r.phase}] ${i}`)),
			followUps: [
				'Design the Angular UI components for the agent marketplace',
				'Generate a test plan for the agent marketplace and chaining flow',
				'Draft the Linear epic breakdown for the Q2 MVP milestones',
			],
		},
	},
	fronto: {
		typed: _FRONTO_TYPED,
		workspace: {
			overview:
				'Fronto has designed a complete component and layout specification for your workspace. Four new components, a five-region layout system, and four design tokens are defined — ready for implementation in your Angular design system.',
			details: _FRONTO_TYPED.uiComponents.map((c) => `${c.name}: ${c.description}`),
			actions: [
				..._FRONTO_TYPED.designSystem.map((t) => `Define token ${t.token} = ${t.value} (${t.usage})`),
				'Implement DataTable with virtual scrolling first — highest complexity and highest reuse value',
				'Add CommandPalette to app shell and wire to keyboard shortcut (Cmd/Ctrl+K)',
			],
			followUps: [
				'Should I write the Angular component implementation for DataTable?',
				'Want me to draft the Storybook stories for all four components?',
				'Shall I produce the Figma component spec?',
			],
		},
	},
	testo: {
		typed: _TESTO_TYPED,
		workspace: {
			overview:
				'Testo has produced a risk-based test suite covering happy paths, validation, session handling, and conflict resolution. The QA checklist prioritizes accessibility gates first, which are the highest-severity production risks for this feature.',
			details: _TESTO_TYPED.testCases.map((tc) => `${tc.id} — ${tc.title}: ${tc.expected}`),
			actions: [
				..._TESTO_TYPED.qaChecklist
					.filter((i) => i.priority === 'high')
					.map((i) => `[HIGH] ${i.item}`),
				..._TESTO_TYPED.qaChecklist
					.filter((i) => i.priority === 'medium')
					.map((i) => `[MEDIUM] ${i.item}`),
				'Automate TC-001 and TC-002 in Playwright E2E suite',
				'Add edge case TC-003 (double-submit) as a unit test on the form submit handler',
			],
			followUps: [
				'Should I generate the Playwright test code for these test cases?',
				'Want me to produce a test plan document for stakeholder sign-off?',
				'Shall I create a risk matrix mapping test cases to business impact?',
			],
		},
	},
	default: {
		typed: {
			testCases: [],
			edgeCases: ['No specific edge cases identified for this agent type.'],
			qaChecklist: [{ item: 'Review output for completeness', priority: 'medium' }],
		} as TestoRunOutput,
		workspace: {
			overview:
				'The agent has completed your request and produced structured output covering the key dimensions of the problem. Review the Details tab for granular findings and the Actions tab for next steps.',
			details: [
				'Primary analysis complete across all specified dimensions',
				'Key dependencies identified and ranked by impact',
				'Risk factors evaluated with mitigation options',
				'Recommended approach selected based on your stated constraints',
			],
			actions: [
				'Review the primary recommendation with your team',
				'Prioritize the identified quick wins for immediate execution',
				'Schedule a follow-up session to tackle the longer-term items',
			],
			followUps: [
				'Want me to elaborate on any specific section?',
				'Should I draft an implementation checklist?',
			],
		},
	},
};
