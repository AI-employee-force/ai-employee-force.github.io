import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { DemoModeService } from '../../../../core/services/demo-mode.service';
import { RunsService } from '../../../../core/services/runs.service';
import { SeoService } from '../../../../core/services/seo.service';
import { WorkspaceService } from '../../../../core/services/workspace.service';
import { WaitlistBarComponent } from '../../../landing/components/waitlist-bar/waitlist-bar.component';
import { ChainBreadcrumbComponent } from '../../components/chain-breadcrumb/chain-breadcrumb.component';
import { HandoffButtonsComponent } from '../../components/handoff-buttons/handoff-buttons.component';
import { OutputPanelComponent } from '../../components/output-panel/output-panel.component';
import { PromptPanelComponent } from '../../components/prompt-panel/prompt-panel.component';
import { WorkspaceHeaderComponent } from '../../components/workspace-header/workspace-header.component';
import type { WorkspaceState } from '../../../../core/models/workspace.models';

@Component({
	selector: 'app-agent-workspace',
	standalone: true,
	imports: [RouterLink, WorkspaceHeaderComponent, PromptPanelComponent, OutputPanelComponent, ChainBreadcrumbComponent, HandoffButtonsComponent, WaitlistBarComponent],
	templateUrl: './agent-workspace.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentWorkspaceComponent {
	private readonly catalog = inject(AgentCatalogService);
	private readonly workspace = inject(WorkspaceService);
	private readonly seo = inject(SeoService);
	private readonly runsService = inject(RunsService);
	protected readonly demoMode = inject(DemoModeService);

	/** Bound from route /workspace/:slug via withComponentInputBinding */
	readonly slug = input.required<string>();

	private readonly DEMO_CHAIN_SLUGS = new Set(['producto', 'fronto', 'testo']);

	protected readonly agent = computed(() => this.catalog.getBySlug(this.slug()));
	protected readonly state = this.workspace.state;
	protected readonly stageLabel = this.workspace.stageLabel;
	protected readonly executionStage = this.workspace.executionStage;
	protected readonly isInChain = this.workspace.isInChain;
	protected readonly completedSteps = this.workspace.completedSteps;
	protected readonly isInDemoChain = computed(() => this.DEMO_CHAIN_SLUGS.has(this.slug()));
	protected readonly currentRunId = this.workspace.currentRunId;

	protected readonly isSaved = computed(() => {
		const id = this.workspace.currentRunId();
		if (!id) return false;
		return this.runsService.getById(id)?.saved ?? false;
	});

	constructor() {
		effect(() => {
			const slug = this.slug();
			this.workspace.initForAgent(slug);
			const agent = this.catalog.getBySlug(slug);
			if (agent) {
				this.seo.setPage({
					title: `${agent.name} workspace — AI Employee Force`,
					description: `Run prompts with ${agent.name}, your ${agent.roleTitle}. ${agent.shortDescription}`,
					robots: 'noindex, nofollow',
				});
			}
		});
	}

	protected onPromptChange(prompt: string): void {
		this.workspace.setPrompt(prompt);
	}

	protected onRun(): void {
		this.workspace.run();
	}

	protected onTabChange(tab: WorkspaceState['activeTab']): void {
		this.workspace.setActiveTab(tab);
	}

	protected onReset(): void {
		this.workspace.reset();
	}

	protected onFollowUpSelected(text: string): void {
		this.workspace.setPrompt(text);
	}

	protected onSaveRequested(): void {
		const id = this.workspace.currentRunId();
		if (id) this.runsService.toggleSave(id);
	}
}
