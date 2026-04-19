/** Domain models for AI Employee Force marketing site & agent catalog */

export type AgentCategory =
	| 'engineering'
	| 'product'
	| 'leadership'
	| 'operations'
	| 'support'
	| 'knowledge'
	| 'finance';

export interface Capability {
	title: string;
	description: string;
}

export interface Agent {
	slug: string;
	name: string;
	roleTitle: string;
	category: AgentCategory;
	categoryLabel: string;
	/** One-line value prop (cards, hero subline). */
	shortDescription: string;
	/** Punchy hero line under the role. */
	heroTagline: string;
	/** Rich overview for profile + SEO (multi-sentence). */
	longDescription: string;
	capabilities: Capability[];
	/** Stack & tooling labels (badges). */
	tools: string[];
	/** Domains / contexts this agent operates in (e.g. industry function). */
	skillDomains: string[];
	useCases: string[];
	whyMatters: string;
	/** Discovery / SEO tags (also shown as keyword chips on the profile). */
	relatedKeywords: string[];
}

export interface Stat {
	id: string;
	value: string;
	label: string;
	hint?: string;
}

export type FeatureIconId =
	| 'orchestrate'
	| 'marketplace'
	| 'governance'
	| 'roles'
	| 'audit'
	| 'scale';

export interface Feature {
	id: string;
	title: string;
	description: string;
	icon: FeatureIconId;
}

export interface NavigationLink {
	label: string;
	path: string;
	external?: boolean;
}

/** Grouped footer links (e.g. Product / Company / Get started). */
export interface FooterNavSection {
	title: string;
	links: readonly NavigationLink[];
}

export interface CtaConfig {
	eyebrow?: string;
	title: string;
	subtitle: string;
	primaryLabel: string;
	primaryPath: string;
	secondaryLabel?: string;
	secondaryPath?: string;
}

/** Route-level and dynamic page metadata; suitable to hydrate from a CMS or headless API. */
export interface PageSeo {
	title: string;
	description: string;
	/** Path only (e.g. `/contact`). Full canonical URL is resolved at runtime in `SeoService`. */
	canonicalPath?: string;
	robots?: string;
	/** Absolute URL for Open Graph / Twitter cards when you add hosted imagery. */
	ogImage?: string;
}
