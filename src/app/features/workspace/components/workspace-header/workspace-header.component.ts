import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import type { Agent, AgentCategory } from '../../../../core/models/site.models';

const CATEGORY_ACCENT: Record<AgentCategory, string> = {
	engineering: 'var(--accent-engineering)',
	product: 'var(--accent-product)',
	leadership: 'var(--accent-leadership)',
	operations: 'var(--accent-operations)',
	support: 'var(--accent-support)',
	knowledge: 'var(--accent-knowledge)',
	finance: 'var(--accent-finance)',
};

@Component({
	selector: 'app-workspace-header',
	standalone: true,
	imports: [],
	templateUrl: './workspace-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceHeaderComponent {
	readonly agent = input.required<Agent>();
	protected readonly portraitSrc = computed(() => agentPortraitSrc(this.agent().slug));
	protected readonly accentColor = computed(
		() => CATEGORY_ACCENT[this.agent().category] ?? 'var(--accent-default)',
	);
}
