import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'aef-onboarded';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
	private readonly _seen = signal(this._loadSeen());

	readonly hasSeen = this._seen.asReadonly();

	markSeen(): void {
		this._seen.set(true);
		try {
			localStorage.setItem(STORAGE_KEY, 'true');
		} catch {}
	}

	private _loadSeen(): boolean {
		try {
			return localStorage.getItem(STORAGE_KEY) === 'true';
		} catch {
			return false;
		}
	}
}
