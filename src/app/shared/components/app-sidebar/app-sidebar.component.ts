import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { agentPortraitSrc } from '../../../core/constants/agent-assets';
import { BRAND_LOGO_SRC, BRAND_NAME } from '../../../core/constants/navigation';
import { AgentCatalogService } from '../../../core/services/agent-catalog.service';
import { AgentInstallService } from '../../../core/services/agent-install.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
	templateUrl: './app-sidebar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
	private readonly installService = inject(AgentInstallService);
	private readonly catalog = inject(AgentCatalogService);

	protected readonly brand = BRAND_NAME;
	protected readonly logoSrc = BRAND_LOGO_SRC;

	/** First 3 installed agents for quick-launch shortcuts. */
	protected readonly quickLaunchAgents = computed(() =>
		this.installService
			.installedAgents()
			.slice(0, 3)
			.map((ia) => ({
				...ia,
				agent: this.catalog.getBySlug(ia.slug),
				portraitSrc: agentPortraitSrc(ia.slug),
			})),
	);
}
