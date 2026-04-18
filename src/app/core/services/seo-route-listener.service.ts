import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import type { AppRouteData } from '../models/route-data.model';
import type { PageSeo } from '../models/site.models';
import { NavigationA11yService } from './navigation-a11y.service';
import { SeoService } from './seo.service';

/**
 * Merges `data.seo` from the route tree (root → leaf) so parent defaults can be overridden by child routes.
 * Applies the result after each navigation and moves focus to the main landmark.
 */
@Injectable({ providedIn: 'root' })
export class SeoRouteListenerService {
	constructor() {
		const router = inject(Router);
		const seo = inject(SeoService);
		const a11y = inject(NavigationA11yService);

		router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
			const raw = router.url.split(/[?#]/)[0] ?? '';
			const pathOnly = raw === '' || raw === '/' ? '/' : raw.startsWith('/') ? raw : `/${raw}`;
			const merged = mergeSeoFromRouteTree(router.routerState.snapshot.root);
			if (merged) {
				seo.setPage({
					...merged,
					canonicalPath: merged.canonicalPath ?? pathOnly,
				});
			} else {
				/** Route has no `data.seo` — reset to service defaults while keeping a sensible canonical URL. */
				seo.setPage({ canonicalPath: pathOnly });
			}
			a11y.focusMain();
		});
	}
}

/** Walks the activated route chain and shallow-merges `seo` objects; later routes win (child overrides parent). */
function mergeSeoFromRouteTree(root: ActivatedRouteSnapshot): Partial<PageSeo> | undefined {
	const chain: ActivatedRouteSnapshot[] = [];
	let r: ActivatedRouteSnapshot | null = root;
	while (r) {
		chain.push(r);
		r = r.firstChild;
	}

	let merged: Partial<PageSeo> | undefined;
	for (const snap of chain) {
		const data = snap.data as AppRouteData;
		if (data?.seo) {
			merged = { ...merged, ...data.seo };
		}
	}
	return merged;
}
