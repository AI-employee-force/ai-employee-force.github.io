import type { PageSeo } from './site.models';

/** Router `data` shape for static marketing routes (extend when adding CMS-driven fields). */
export interface AppRouteData {
	/** Merged from the route tree on navigation; child routes override parents. */
	seo?: Partial<PageSeo>;
}
