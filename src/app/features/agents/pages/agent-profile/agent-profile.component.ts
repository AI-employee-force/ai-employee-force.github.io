import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentCatalogService } from '../../../../core/services/agent-catalog.service';
import { SeoService } from '../../../../core/services/seo.service';
import { AgentCardComponent } from '../../../../shared/components/agent-card/agent-card.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

function truncateForMeta(text: string, max = 158): string {
	const t = text.replace(/\s+/g, ' ').trim();
	if (t.length <= max) return t;
	return `${t.slice(0, max - 1).trimEnd()}…`;
}

@Component({
	selector: 'app-agent-profile',
	imports: [RouterLink, PrimaryButtonComponent, AgentCardComponent, SectionHeadingComponent, RevealOnScrollDirective],
	templateUrl: './agent-profile.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentProfileComponent {
	private readonly catalog = inject(AgentCatalogService);
	private readonly seo = inject(SeoService);

	/** Bound from route `agents/:slug` when `withComponentInputBinding` is enabled. */
	readonly slug = input.required<string>();

	protected readonly agent = computed(() => this.catalog.getBySlug(this.slug()));

	protected readonly relatedAgents = computed(() => {
		const a = this.agent();
		if (!a) return [];
		return this.catalog.getRelatedAgents(a.slug, 3);
	});

	/** Deduped keyword chips for hero / discovery. */
	protected readonly keywordChips = computed(() => {
		const a = this.agent();
		if (!a) return [];
		const seen = new Set<string>();
		const out: string[] = [];
		for (const k of a.relatedKeywords) {
			const t = k.trim();
			if (!t || seen.has(t)) continue;
			seen.add(t);
			out.push(t);
			if (out.length >= 14) break;
		}
		return out;
	});

	/** Short labels for the “strengths” column (capability titles). */
	protected readonly strengthLabels = computed(() => {
		const a = this.agent();
		if (!a) return [];
		return a.capabilities.slice(0, 6).map((c) => c.title);
	});

	constructor() {
		effect(() => {
			const a = this.agent();
			const slug = this.slug();
			if (a) {
				this.seo.setPage({
					title: `${a.name} — ${a.roleTitle} | AI Employee Force`,
					description: truncateForMeta(a.longDescription || a.shortDescription),
					robots: 'index, follow',
					canonicalPath: `/agents/${slug}`,
				});
			} else {
				this.seo.setPage({
					title: 'Agent not found — AI Employee Force',
					description:
						'No AI employee matches this profile link. Browse the marketplace to explore available role-based agents.',
					robots: 'noindex, nofollow',
					/** Consolidate invalid URLs toward the marketplace index for crawlers. */
					canonicalPath: '/agents',
				});
			}
		});
	}
}
