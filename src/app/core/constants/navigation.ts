import type { NavigationLink } from '../models/site.models';

export const PRIMARY_NAV: readonly NavigationLink[] = [
	{ label: 'Platform', path: '/' },
	{ label: 'Agent marketplace', path: '/agents' },
	{ label: 'About', path: '/about' },
	{ label: 'Demo', path: '/demo' },
	{ label: 'Contact', path: '/contact' },
] as const;

export const BRAND_NAME = 'AI Employee Force';

/** Public asset path (`public/` → site root). */
export const BRAND_LOGO_SRC = '/aef-logo.png';
