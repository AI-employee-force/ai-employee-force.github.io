import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
	selector: 'app-feedback-widget',
	standalone: true,
	templateUrl: './feedback-widget.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackWidgetComponent {
	private readonly feedbackService = inject(FeedbackService);
	private readonly analytics = inject(AnalyticsService);

	readonly runId = input.required<string>();
	readonly feedbackSubmitted = output<void>();

	protected readonly rating = signal<'up' | 'down' | null>(null);
	protected readonly comment = signal('');
	protected readonly submitted = signal(false);

	protected selectRating(r: 'up' | 'down'): void {
		this.rating.set(r);
		if (r === 'up') {
			this.submit();
		}
	}

	protected onCommentChange(value: string): void {
		this.comment.set(value);
	}

	protected submit(): void {
		const r = this.rating();
		if (!r) return;
		this.feedbackService.submit({
			runId: this.runId(),
			rating: r,
			comment: this.comment() || undefined,
			timestamp: new Date().toISOString(),
		});
		this.analytics.track('feedback_submitted', { rating: r, runId: this.runId() });
		this.submitted.set(true);
		this.feedbackSubmitted.emit();
	}
}
