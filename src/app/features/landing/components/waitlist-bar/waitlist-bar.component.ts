import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AnalyticsService } from '../../../../core/services/analytics.service';

const STORAGE_KEY = 'aef-waitlist';

@Component({
	selector: 'app-waitlist-bar',
	standalone: true,
	templateUrl: './waitlist-bar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitlistBarComponent {
	private readonly analytics = inject(AnalyticsService);

	protected email = '';
	protected readonly submitted = signal(false);
	protected readonly submitting = signal(false);
	protected readonly error = signal<string | null>(null);

	protected onEmailChange(value: string): void {
		this.email = value;
		this.error.set(null);
	}

	protected onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') this.submit();
	}

	protected submit(): void {
		const email = this.email.trim();
		if (!email || !email.includes('@')) {
			this.error.set('Enter a valid email address.');
			return;
		}
		this.submitting.set(true);

		// Store locally
		try {
			const existing: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
			if (!existing.includes(email)) {
				existing.push(email);
				localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
			}
		} catch {}

		// Fire analytics
		this.analytics.track('waitlist_joined', { email });

		// POST to configured endpoint if set
		const endpoint = (environment as { waitlistEndpoint?: string }).waitlistEndpoint;
		if (endpoint) {
			fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			}).catch(() => {});
		}

		this.submitting.set(false);
		this.submitted.set(true);
	}
}
