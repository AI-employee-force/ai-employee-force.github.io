import { Injectable, computed, signal } from '@angular/core';
import { MOCK_INSTALLED_AGENTS } from '../data/mock-workspace';
import type { InstalledAgent } from '../models/workspace.models';

@Injectable({ providedIn: 'root' })
export class AgentInstallService {
	private readonly _installed = signal<Map<string, InstalledAgent>>(
		new Map(MOCK_INSTALLED_AGENTS.map((a) => [a.slug, { ...a }])),
	);

	readonly installedAgents = computed<InstalledAgent[]>(() => [...this._installed().values()]);

	isInstalled(slug: string): boolean {
		return this._installed().has(slug);
	}

	install(slug: string): void {
		if (this._installed().has(slug)) return;
		this._installed.update((m) => {
			const next = new Map(m);
			next.set(slug, {
				slug,
				installedAt: new Date().toISOString(),
				lastRunAt: null,
				runCount: 0,
			});
			return next;
		});
	}

	uninstall(slug: string): void {
		this._installed.update((m) => {
			const next = new Map(m);
			next.delete(slug);
			return next;
		});
	}
}
