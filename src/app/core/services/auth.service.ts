import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'aef-user';

export interface AuthUser {
	email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly _user = signal<AuthUser | null>(
		this._loadUser(),
	);

	readonly currentUser = this._user.asReadonly();
	readonly isLoggedIn = computed(() => this._user() !== null);

	login(email: string): void {
		const user: AuthUser = { email };
		this._user.set(user);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
		} catch {}
	}

	logout(): void {
		this._user.set(null);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {}
	}

	private _loadUser(): AuthUser | null {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as AuthUser | null;
		} catch {
			return null;
		}
	}
}
