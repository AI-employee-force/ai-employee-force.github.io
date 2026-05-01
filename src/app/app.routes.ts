import { Routes } from '@angular/router';
import { ROUTE_SEO } from './core/constants/route-seo';
import { authGuard } from './core/guards/auth.guard';
import type { AppRouteData } from './core/models/route-data.model';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./features/landing/pages/landing-page/landing-page.component').then((m) => m.LandingPageComponent),
		data: { seo: ROUTE_SEO.home } satisfies AppRouteData,
	},
	{
		path: 'login',
		loadComponent: () =>
			import('./features/auth/pages/login/login-page.component').then((m) => m.LoginPageComponent),
		data: { seo: { title: 'Sign in — AI Employee Force', description: 'Sign in to your AI Employee Force account.' } } satisfies AppRouteData,
	},
	{
		path: 'agents',
		loadComponent: () =>
			import('./features/agents/pages/agent-directory/agent-directory.component').then(
				(m) => m.AgentDirectoryComponent,
			),
		data: { seo: ROUTE_SEO.agents, layout: 'app' } satisfies AppRouteData,
	},
	{
		path: 'agents/:slug',
		loadComponent: () =>
			import('./features/agents/pages/agent-profile/agent-profile.component').then((m) => m.AgentProfileComponent),
		data: { seo: ROUTE_SEO.agentProfile, layout: 'app' } satisfies AppRouteData,
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
		path: 'dashboard',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(
				(m) => m.DashboardPageComponent,
			),
		data: { seo: ROUTE_SEO.dashboard, layout: 'app' } satisfies AppRouteData,
	},
	{
		path: 'workspace/:slug',
		loadComponent: () =>
			import('./features/workspace/pages/agent-workspace/agent-workspace.component').then(
				(m) => m.AgentWorkspaceComponent,
			),
		data: { seo: ROUTE_SEO.workspace, layout: 'app' } satisfies AppRouteData,
	},
	{
		path: 'runs',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./features/runs/pages/runs-page/runs-page.component').then((m) => m.RunsPageComponent),
		data: { seo: ROUTE_SEO.runs, layout: 'app' } satisfies AppRouteData,
	},
	{
		path: 'pricing',
		loadComponent: () =>
			import('./features/pricing/pages/pricing-page/pricing-page.component').then((m) => m.PricingPageComponent),
		data: { seo: ROUTE_SEO.pricing } satisfies AppRouteData,
	},
	{
		path: 'billing',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./features/billing/pages/billing-page/billing-page.component').then((m) => m.BillingPageComponent),
		data: { seo: ROUTE_SEO.billing, layout: 'app' } satisfies AppRouteData,
	},
	{
		path: '**',
		loadComponent: () =>
			import('./features/system/pages/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent),
		data: { seo: ROUTE_SEO.notFound } satisfies AppRouteData,
	},
];
