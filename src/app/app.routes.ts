import { Routes } from '@angular/router';
import { ROUTE_SEO } from './core/constants/route-seo';
import type { AppRouteData } from './core/models/route-data.model';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/landing/pages/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
		data: { seo: ROUTE_SEO.home } satisfies AppRouteData,
	},
	{
		path: 'agents',
		loadComponent: () =>
			import('./features/agents/pages/agent-directory/agent-directory.component').then(
				(m) => m.AgentDirectoryComponent,
			),
		data: { seo: ROUTE_SEO.agents } satisfies AppRouteData,
	},
	{
		path: 'agents/:slug',
		loadComponent: () =>
			import('./features/agents/pages/agent-profile/agent-profile.component').then((m) => m.AgentProfileComponent),
		data: { seo: ROUTE_SEO.agentProfile } satisfies AppRouteData,
	},
	{
		path: 'about',
		loadComponent: () =>
			import('./features/company/pages/about/about-page.component').then((m) => m.AboutPageComponent),
		data: { seo: ROUTE_SEO.about } satisfies AppRouteData,
	},
	{
		path: 'demo',
		loadComponent: () =>
			import('./features/demo/pages/demo-page/demo-page.component').then((m) => m.DemoPageComponent),
		data: { seo: ROUTE_SEO.demo } satisfies AppRouteData,
	},
	{
		path: 'contact',
		loadComponent: () =>
			import('./features/company/pages/contact/contact-page.component').then((m) => m.ContactPageComponent),
		data: { seo: ROUTE_SEO.contact } satisfies AppRouteData,
	},
	{
		path: '**',
		loadComponent: () =>
			import('./features/system/pages/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent),
		data: { seo: ROUTE_SEO.notFound } satisfies AppRouteData,
	},
];
