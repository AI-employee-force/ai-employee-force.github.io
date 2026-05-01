import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import type { AgentCategory } from '../../../../core/models/site.models';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { AgentCardComponent } from '../../../../shared/components/agent-card/agent-card.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-agent-directory',
	imports: [SectionHeadingComponent, AgentCardComponent, RevealOnScrollDirective],
	templateUrl: './agent-directory.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentDirectoryComponent {
	private readonly catalog = inject(AgentCatalogService);

	protected readonly search = signal('');
	protected readonly category = signal<AgentCategory | 'all'>('all');
	protected readonly useCase = signal<string | null>(null);

	/** Department tabs with counts for the current search (same matching rules as the grid). */
	protected readonly categoryTabs = computed(() => {
		const q = this.search();
		const uc = this.useCase();
		return this.catalog.getCategories().map((c) => ({
			...c,
			count: this.catalog.filterAgents(q, c.id, uc).length,
		}));
	});

	protected readonly filtered = computed(() =>
		this.catalog.filterAgents(this.search(), this.category(), this.useCase()),
	);

	/** Top 10 use-case keywords by frequency across all agents. */
	protected readonly popularUseCases = computed(() => {
		const counts = new Map<string, number>();
		for (const agent of this.catalog.getAll()) {
			for (const kw of agent.relatedKeywords.slice(0, 6)) {
				const k = kw.trim();
				if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
			}
		}
		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 10)
			.map(([label]) => label);
	});

	onSearchInput(event: Event): void {
		const v = (event.target as HTMLInputElement).value;
		this.search.set(v);
	}

	selectCategory(cat: AgentCategory | 'all'): void {
		this.category.set(cat);
	}

	selectUseCase(tag: string): void {
		this.useCase.update((v) => (v === tag ? null : tag));
	}
}
