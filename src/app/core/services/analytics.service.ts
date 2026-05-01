import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
	track(event: string, props?: Record<string, unknown>): void {
		if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>)['gtag']) {
			((window as unknown as Record<string, (...args: unknown[]) => void>)['gtag'])('event', event, props ?? {});
		}
		if (!(environment as { production?: boolean }).production) {
			console.log('[Analytics]', event, props);
		}
	}
}
