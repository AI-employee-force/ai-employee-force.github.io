import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

const STORAGE_KEY = 'aef-demo-runs';
const DEFAULT_MAX = 3;

@Injectable({ providedIn: 'root' })
export class DemoModeService {
	private readonly authService = inject(AuthService);
	private readonly _used = signal(this._loadUsed());

	readonly maxRuns: number = (environment as { demoMaxRuns?: number }).demoMaxRuns ?? DEFAULT_MAX;
	readonly runsUsed = this._used.asReadonly();

	/** True when the user is not logged in and has exhausted their demo run allowance. */
	readonly isExhausted = computed(
		() => !this.authService.isLoggedIn() && this._used() >= this.maxRuns,
	);

	increment(): void {
		this._used.update((n) => n + 1);
		try {
			localStorage.setItem(STORAGE_KEY, String(this._used()));
		} catch {}
	}

	private _loadUsed(): number {
		try {
			return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10) || 0;
		} catch {
			return 0;
		}
	}
}
