import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

interface ChainNode {
	slug: string;
	name: string;
	role: string;
	prompt: string;
	outputType: string;
	accentVar: string;
}

const CHAIN_NODES: ChainNode[] = [
	{
		slug: 'producto',
		name: 'Producto',
		role: 'Product Manager',
		prompt: 'Write a PRD for the auth redesign',
		outputType: 'PRD',
		accentVar: '--accent-product',
	},
	{
		slug: 'fronto',
		name: 'Fronto',
		role: 'Frontend Developer',
		prompt: 'Design Angular components from the PRD',
		outputType: 'Component spec',
		accentVar: '--accent-engineering',
	},
	{
		slug: 'testo',
		name: 'Testo',
		role: 'QA Engineer',
		prompt: 'Generate test cases for the components',
		outputType: 'Test plan',
		accentVar: '--accent-engineering',
	},
];

const SAMPLE_OUTPUT = {
	overview:
		'Redesigned auth flow featuring email/password login, OAuth providers, and MFA. Modular Angular components with shared state management and accessibility compliance.',
	actions: [
		'Scaffold AuthShellComponent with lazy-loaded routes',
		'Implement LoginFormComponent with reactive forms + validation',
		'Wire OAuth buttons to existing identity provider service',
	],
	followUps: [
		'Should the session management use JWT or server-side tokens?',
		'Does MFA require hardware key support?',
	],
};

@Component({
	selector: 'app-demo-flow-section',
	standalone: true,
	imports: [RouterLink, SectionHeadingComponent, RevealOnScrollDirective],
	templateUrl: './demo-flow-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoFlowSectionComponent {
	protected readonly nodes = CHAIN_NODES;
	protected readonly output = SAMPLE_OUTPUT;
	protected readonly outputExpanded = signal(false);

	protected toggleOutput(): void {
		this.outputExpanded.update((v) => !v);
	}

	protected agentPortrait(slug: string): string {
		return `/assets/agents/${slug}-portrait.webp`;
	}
}
