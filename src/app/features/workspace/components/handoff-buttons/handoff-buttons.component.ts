import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { AgentChainService } from '../../../../core/services/agent-chain.service';
import { WorkspaceService } from '../../../../core/services/workspace.service';
import type { WorkspaceOutput } from '../../../../core/models/workspace.models';

@Component({
	selector: 'app-handoff-buttons',
	standalone: true,
	templateUrl: './handoff-buttons.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandoffButtonsComponent {
	private readonly chainService = inject(AgentChainService);
	private readonly catalog = inject(AgentCatalogService);
	private readonly workspaceService = inject(WorkspaceService);

	readonly fromSlug = input.required<string>();
	readonly output = input.required<WorkspaceOutput>();

	protected readonly targets = computed(() =>
		this.chainService.targetsFor(this.fromSlug()).map((t) => ({
			...t,
			agent: this.catalog.getBySlug(t.slug),
			portraitSrc: agentPortraitSrc(t.slug),
		})),
	);

	protected handoff(toSlug: string): void {
		const prompt = this.workspaceService.state().prompt;
		const fromName = this.catalog.getBySlug(this.fromSlug())?.name ?? this.fromSlug();
		this.chainService.initiateHandoff(this.fromSlug(), fromName, prompt, this.output(), toSlug);
	}
}
