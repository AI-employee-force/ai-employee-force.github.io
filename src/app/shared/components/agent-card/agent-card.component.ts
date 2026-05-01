import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { agentPortraitSrc } from '../../../core/constants/agent-assets';
import { AgentCatalogService } from '../../../core/services/agent-catalog.service';
import { AgentInstallService } from '../../../core/services/agent-install.service';
import type { Agent } from '../../../core/models/site.models';

@Component({
	selector: 'app-agent-card',
	imports: [RouterLink],
	templateUrl: './agent-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentCardComponent {
	private readonly installService = inject(AgentInstallService);
	private readonly catalog = inject(AgentCatalogService);

	readonly agent = input.required<Agent>();
	/**
	 * 'full'    — marketplace card: capabilities, status badge, action buttons, starter prompts (default)
	 * 'related' — compact profile-page card: portrait + name + role + "View profile" only
	 */
	readonly variant = input<'full' | 'related'>('full');

	protected readonly portraitUrl = computed(() => agentPortraitSrc(this.agent().slug));
	protected readonly isInstalled = computed(() => this.installService.isInstalled(this.agent().slug));
	protected readonly capabilityChips = computed(() =>
		this.agent().capabilities.slice(0, 2).map((c) => c.title),
	);
	protected readonly starterPrompts = computed(() =>
		this.catalog.getStarterPrompts(this.agent().slug).slice(0, 2),
	);

	protected toggleInstall(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		if (this.isInstalled()) {
			this.installService.uninstall(this.agent().slug);
		} else {
			this.installService.install(this.agent().slug);
		}
	}
}
