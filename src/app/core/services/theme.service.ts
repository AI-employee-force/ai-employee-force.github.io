import { effect, Injectable, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export type ThemePreference = 'light' | 'dark';

const STORAGE_KEY = 'aef-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly meta = inject(Meta);

	/** User choice: light (default) or dark */
	readonly preference = signal<ThemePreference>(this.readStored());

	constructor() {
		effect(() => {
			const mode = this.preference();
			const root = document.documentElement;
			root.classList.toggle('dark', mode === 'dark');
			root.setAttribute('data-theme', mode);
			this.meta.updateTag({
				name: 'theme-color',
				content: mode === 'dark' ? '#0b0a14' : '#faf8ff',
			});
		});
	}

	setPreference(value: ThemePreference): void {
		this.preference.set(value);
		try {
			globalThis.localStorage?.setItem(STORAGE_KEY, value);
		} catch {
			/* ignore */
		}
	}

	private readStored(): ThemePreference {
		try {
			const v = globalThis.localStorage?.getItem(STORAGE_KEY);
			if (v === 'light' || v === 'dark') return v;
			/** Legacy: migrate system → light */
			if (v === 'system') {
				globalThis.localStorage?.setItem(STORAGE_KEY, 'light');
			}
		} catch {
			/* ignore */
		}
		return 'light';
	}
}
