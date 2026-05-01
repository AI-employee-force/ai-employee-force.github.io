import { Injectable, signal } from '@angular/core';

export interface FeedbackEntry {
	runId: string;
	rating: 'up' | 'down';
	comment?: string;
	timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
	private readonly _entries = signal<FeedbackEntry[]>([]);

	readonly entries = this._entries.asReadonly();

	submit(entry: FeedbackEntry): void {
		this._entries.update((e) => [entry, ...e]);
	}
}
