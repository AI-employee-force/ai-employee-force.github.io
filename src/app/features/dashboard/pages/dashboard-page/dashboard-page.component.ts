import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { AgentChainService } from '../../../../core/services/agent-chain.service';
import { AgentInstallService } from '../../../../core/services/agent-install.service';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { RunsService } from '../../../../core/services/runs.service';
import { CtaSectionComponent } from '../../../../shared/components/cta-section/cta-section.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { InstalledAgentsGridComponent } from '../../components/installed-agents-grid/installed-agents-grid.component';
import { RecentRunsTableComponent } from '../../components/recent-runs-table/recent-runs-table.component';
import { TemplatesGridComponent } from '../../components/templates-grid/templates-grid.component';
import { MilestoneCardComponent } from '../../components/milestone-card/milestone-card.component';
import { ContinueChainCardComponent } from '../../components/continue-chain-card/continue-chain-card.component';
import { OnboardingOverlayComponent } from '../../../onboarding/components/onboarding-overlay/onboarding-overlay.component';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import type { CtaConfig } from '../../../../core/models/site.models';

const WORKSPACE_CTA: CtaConfig = {
	eyebrow: 'Quick start',
	title: 'Run your first task with Producto',
	subtitle:
		'Draft PRDs, release notes, and product specs in seconds. Producto is ready for your first prompt.',
	primaryLabel: 'Open Producto workspace',
	primaryPath: '/workspace/producto',
	secondaryLabel: 'View all agents',
	secondaryPath: '/agents',
};

@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	imports: [
		RouterLink,
		SectionHeadingComponent,
		CtaSectionComponent,
		RevealOnScrollDirective,
		RecentRunsTableComponent,
		InstalledAgentsGridComponent,
		TemplatesGridComponent,
		MilestoneCardComponent,
		ContinueChainCardComponent,
		OnboardingOverlayComponent,
	],
	templateUrl: './dashboard-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
	private readonly catalog = inject(AgentCatalogService);
	private readonly runsService = inject(RunsService);
	private readonly installService = inject(AgentInstallService);
	private readonly chainService = inject(AgentChainService);
	protected readonly favoritesService = inject(FavoritesService);
	private readonly onboardingService = inject(OnboardingService);

	protected readonly showOnboarding = signal(!this.onboardingService.hasSeen());

	protected readonly quickLaunchAgents = computed(() =>
		this.catalog.getAll().slice(0, 6).map((a) => ({ ...a, portraitSrc: agentPortraitSrc(a.slug) })),
	);
	protected readonly recentRuns = this.runsService.recentRuns;
	protected readonly savedRuns = this.runsService.savedRuns;
	protected readonly completedCount = this.runsService.completedCount;
	protected readonly installedAgents = this.installService.installedAgents;
	protected readonly agentMap = computed(() => new Map(this.catalog.getAll().map((a) => [a.slug, a])));
	protected readonly lastChain = this.chainService.lastChain;
	protected readonly hasChained = computed(() => this.chainService.lastChain() !== null);
	protected readonly workspaceCta = WORKSPACE_CTA;

	protected onOnboardingDismissed(): void {
		this.showOnboarding.set(false);
	}

	protected toggleFavorite(slug: string, event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.favoritesService.toggle(slug);
	}
}
