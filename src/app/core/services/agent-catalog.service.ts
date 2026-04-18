import { Injectable } from '@angular/core';
import { MOCK_AGENTS } from '../data/mock-agents';
import type { Agent, AgentCategory } from '../models/site.models';

/**
 * Facade over the agent roster. Swap `MOCK_AGENTS` for an HTTP-backed source without changing feature components.
 */
@Injectable({
	providedIn: 'root',
})
export class AgentCatalogService {
	private readonly agents: Agent[] = [...MOCK_AGENTS];

	getAll(): readonly Agent[] {
		return this.agents;
	}

	getBySlug(slug: string): Agent | undefined {
		return this.agents.find((a) => a.slug === slug);
	}

	/** Related profiles: prefer same category, then any others; excludes current slug. */
	getRelatedAgents(currentSlug: string, limit = 3): Agent[] {
		const current = this.getBySlug(currentSlug);
		if (!current) return [];
		const others = this.agents.filter((a) => a.slug !== currentSlug);
		const sameCat = others.filter((a) => a.category === current.category);
		const otherCat = others.filter((a) => a.category !== current.category);
		return [...sameCat, ...otherCat].slice(0, limit);
	}

	filterAgents(query: string, category: AgentCategory | 'all'): Agent[] {
		const q = query.trim().toLowerCase();
		return this.agents.filter((a) => {
			const catOk = category === 'all' || a.category === category;
			if (!catOk) return false;
			if (!q) return true;
			const hay =
				`${a.name} ${a.roleTitle} ${a.shortDescription} ${a.longDescription} ${a.categoryLabel} ${a.tools.join(' ')}`.toLowerCase();
			return hay.includes(q);
		});
	}

	getCategories(): { id: AgentCategory | 'all'; label: string }[] {
		return [
			{ id: 'all', label: 'All' },
			{ id: 'engineering', label: 'Engineering' },
			{ id: 'product', label: 'Product' },
			{ id: 'leadership', label: 'Leadership' },
			{ id: 'operations', label: 'Operations' },
			{ id: 'support', label: 'Support' },
			{ id: 'knowledge', label: 'Knowledge' },
			{ id: 'finance', label: 'Finance' },
		];
	}
}
