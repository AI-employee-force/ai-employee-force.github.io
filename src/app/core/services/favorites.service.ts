import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
	private readonly _favorites = signal<Set<string>>(new Set());

	readonly favorites = this._favorites.asReadonly();

	isFavorite(slug: string): boolean {
		return this._favorites().has(slug);
	}

	toggle(slug: string): void {
		this._favorites.update((s) => {
			const next = new Set(s);
			if (next.has(slug)) {
				next.delete(slug);
			} else {
				next.add(slug);
			}
			return next;
		});
	}
}
