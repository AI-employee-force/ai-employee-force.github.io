import { ChangeDetectionStrategy, Component, HostListener, inject, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../../../core/services/onboarding.service';
import { AnalyticsService } from '../../../../core/services/analytics.service';

interface OnboardingStep {
	icon: string;
	title: string;
	body: string;
}

const STEPS: OnboardingStep[] = [
	{
		icon: '🤖',
		title: 'Your AI workforce, on demand',
		body: 'Hire agents by role. Each one delivers structured, actionable output — not chat.',
	},
	{
		icon: '⚡',
		title: 'Run tasks in seconds',
		body: 'Write a prompt, click Run. Get an overview, detailed breakdown, and next actions.',
	},
	{
		icon: '🔗',
		title: 'Chain agents to build anything',
		body: 'Producto → Fronto → Testo: idea to UI to tests in one connected flow.',
	},
];

@Component({
	selector: 'app-onboarding-overlay',
	standalone: true,
	templateUrl: './onboarding-overlay.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingOverlayComponent {
	private readonly onboardingService = inject(OnboardingService);
	private readonly analytics = inject(AnalyticsService);
	private readonly router = inject(Router);

	readonly dismissed = output<void>();

	protected readonly steps = STEPS;
	protected readonly step = signal(0);

	protected get currentStep(): OnboardingStep {
		return STEPS[this.step()];
	}

	protected get isLast(): boolean {
		return this.step() === STEPS.length - 1;
	}

	protected next(): void {
		if (this.isLast) {
			this.complete();
		} else {
			this.step.update((s) => s + 1);
		}
	}

	protected skip(): void {
		this.dismiss();
	}

	protected goToStep(index: number): void {
		this.step.set(index);
	}

	@HostListener('document:keydown.escape')
	protected onEscape(): void {
		this.dismiss();
	}

	private complete(): void {
		this.analytics.track('onboarding_completed');
		this.onboardingService.markSeen();
		this.dismissed.emit();
		this.router.navigate(['/workspace', 'producto']);
	}

	private dismiss(): void {
		this.onboardingService.markSeen();
		this.dismissed.emit();
	}
}
