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

	/** Department tabs with counts for the current search (same matching rules as the grid). */
	protected readonly categoryTabs = computed(() => {
		const q = this.search();
		return this.catalog.getCategories().map((c) => ({
			...c,
			count: this.catalog.filterAgents(q, c.id).length,
		}));
	});

	protected readonly filtered = computed(() =>
		this.catalog.filterAgents(this.search(), this.category()),
	);

	onSearchInput(event: Event): void {
		const v = (event.target as HTMLInputElement).value;
		this.search.set(v);
	}

	selectCategory(cat: AgentCategory | 'all'): void {
		this.category.set(cat);
	}
}
