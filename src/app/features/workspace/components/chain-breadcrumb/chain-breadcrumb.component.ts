import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { agentPortraitSrc } from '../../../../core/constants/agent-assets';
import type { AgentChainStep } from '../../../../core/models/workspace.models';

type StepState = 'completed' | 'current' | 'pending';

@Component({
	selector: 'app-chain-breadcrumb',
	standalone: true,
	templateUrl: './chain-breadcrumb.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChainBreadcrumbComponent {
	readonly currentSlug = input.required<string>();
	readonly completedSteps = input.required<AgentChainStep[]>();

	protected readonly CHAIN_PATH = [
		{ slug: 'producto', label: 'Producto' },
		{ slug: 'fronto', label: 'Fronto' },
		{ slug: 'testo', label: 'Testo' },
	];

	protected readonly nodes = computed(() =>
		this.CHAIN_PATH.map((node) => ({
			...node,
			state: this._stepState(node.slug),
			portraitSrc: agentPortraitSrc(node.slug),
		})),
	);

	private _stepState(slug: string): StepState {
		if (this.completedSteps().some((s) => s.agentSlug === slug)) return 'completed';
		if (slug === this.currentSlug()) return 'current';
		return 'pending';
	}

	protected nodeClass(state: StepState): string {
		const base = 'flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition';
		switch (state) {
			case 'completed':
				return `${base} border border-emerald-400/35 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300`;
			case 'current':
				return `${base} border border-cyan-400/50 bg-cyan-500/15 text-cyan-800 dark:border-cyan-400/35 dark:bg-cyan-400/15 dark:text-cyan-200`;
			case 'pending':
				return `${base} border border-slate-200/80 bg-white/40 text-slate-400 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-500`;
		}
	}

	protected dotClass(state: StepState): string {
		const base = 'h-1.5 w-1.5 shrink-0 rounded-full';
		switch (state) {
			case 'completed':
				return `${base} bg-emerald-500 dark:bg-emerald-400`;
			case 'current':
				return `${base} bg-cyan-500 dark:bg-cyan-400 animate-pulse`;
			case 'pending':
				return `${base} bg-slate-300 dark:bg-slate-600`;
		}
	}
}
