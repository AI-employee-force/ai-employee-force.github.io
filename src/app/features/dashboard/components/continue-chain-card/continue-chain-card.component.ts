import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import { AgentChainService } from '../../../../core/services/agent-chain.service';
import type { AgentChain } from '../../../../core/models/workspace.models';

const CHAIN_SEQUENCE = ['producto', 'fronto', 'testo'];
const CHAIN_LABELS: Record<string, string> = {
	producto: 'Producto',
	fronto: 'Fronto',
	testo: 'Testo',
};

@Component({
	selector: 'app-continue-chain-card',
	standalone: true,
	templateUrl: './continue-chain-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinueChainCardComponent {
	private readonly chainService = inject(AgentChainService);

	readonly chain = input.required<AgentChain>();

	protected readonly nodes = computed(() => {
		const completedSlugs = new Set(this.chain().steps.map((s) => s.agentSlug));
		const nextSlug = CHAIN_SEQUENCE.find((s) => !completedSlugs.has(s));
		return CHAIN_SEQUENCE.map((slug) => ({
			slug,
			label: CHAIN_LABELS[slug] ?? slug,
			portraitSrc: agentPortraitSrc(slug),
			state: completedSlugs.has(slug) ? ('completed' as const) : slug === nextSlug ? ('next' as const) : ('pending' as const),
		}));
	});

	protected resume(): void {
		this.chainService.resumeLastChain();
	}
}
