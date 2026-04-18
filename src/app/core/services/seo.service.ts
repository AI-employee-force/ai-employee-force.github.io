import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BRAND_NAME } from '../constants/navigation';
import type { PageSeo } from '../models/site.models';

const DEFAULT: PageSeo = {
	title: 'AI Employee Force — Enterprise AI workforce & agent marketplace',
	description:
		'Discover, deploy, and orchestrate role-based AI employees across engineering, product, operations, and more. Enterprise-ready governance for AI-native organizations.',
	robots: 'index, follow',
};

@Injectable({
	providedIn: 'root',
})
export class SeoService {
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);
	private readonly doc = inject(DOCUMENT);

	setPage(seo: Partial<PageSeo>): void {
		const merged: PageSeo = { ...DEFAULT, ...seo };
		this.title.setTitle(merged.title);
		this.meta.updateTag({ name: 'description', content: merged.description });

		this.meta.updateTag({ property: 'og:title', content: merged.title });
		this.meta.updateTag({ property: 'og:description', content: merged.description });
		this.meta.updateTag({ property: 'og:type', content: 'website' });
		this.meta.updateTag({ property: 'og:site_name', content: BRAND_NAME });
		this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this.meta.updateTag({ name: 'twitter:title', content: merged.title });
		this.meta.updateTag({ name: 'twitter:description', content: merged.description });

		const robots: string = merged.robots ?? DEFAULT.robots ?? 'index, follow';
		this.meta.updateTag({ name: 'robots', content: robots });

		if (merged.ogImage) {
			this.meta.updateTag({ property: 'og:image', content: merged.ogImage });
			this.meta.updateTag({ name: 'twitter:image', content: merged.ogImage });
		} else {
			this.safeRemoveMeta("property='og:image'");
			this.safeRemoveMeta("name='twitter:image'");
		}

		const path = merged.canonicalPath ?? this.getCurrentPathname();
		const absolute = this.toAbsoluteUrl(path);
		this.setCanonicalHref(absolute);
		this.meta.updateTag({ property: 'og:url', content: absolute });
	}

	private getCurrentPathname(): string {
		const p = this.doc.defaultView?.location.pathname;
		return p && p.length > 0 ? p : '/';
	}

	private toAbsoluteUrl(path: string): string {
		const origin = this.getOrigin();
		const normalized = path.startsWith('/') ? path : `/${path}`;
		return origin ? `${origin}${normalized}` : normalized;
	}

	private getOrigin(): string {
		return this.doc.defaultView?.location.origin ?? '';
	}

	private setCanonicalHref(href: string): void {
		const head = this.doc.head;
		if (!head) return;
		let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
		if (!link) {
			link = this.doc.createElement('link');
			link.setAttribute('rel', 'canonical');
			head.appendChild(link);
		}
		link.setAttribute('href', href);
	}

	private safeRemoveMeta(selector: string): void {
		try {
			this.meta.removeTag(selector);
		} catch {
			/* ignore */
		}
	}
}
