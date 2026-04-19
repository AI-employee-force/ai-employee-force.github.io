import type { FooterNavSection, NavigationLink } from '../models/site.models';

export const PRIMARY_NAV: readonly NavigationLink[] = [
	{ label: 'Platform', path: '/' },
	{ label: 'Agent marketplace', path: '/agents' },
	{ label: 'About', path: '/about' },
	{ label: 'Demo', path: '/demo' },
	{ label: 'Contact', path: '/contact' },
] as const;

/** Multi-column footer navigation (paths may repeat across sections with different labels). */
export const FOOTER_NAV_SECTIONS: readonly FooterNavSection[] = [
	{
		title: 'Product',
		links: [
			{ label: 'Platform', path: '/' },
			{ label: 'Agent marketplace', path: '/agents' },
			{ label: 'Interactive demo', path: '/demo' },
		],
	},
	{
		title: 'Company',
		links: [
			{ label: 'About', path: '/about' },
			{ label: 'Contact', path: '/contact' },
		],
	},
	{
		title: 'Get started',
		links: [
			{ label: 'Request a demo', path: '/demo' },
			{ label: 'Talk to our team', path: '/contact' },
		],
	},
] as const;

export const BRAND_NAME = 'AI Employee Force';

/** Public asset path (`public/` → site root). */
export const BRAND_LOGO_SRC = '/aef-logo.png';
