import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import type { PlanId } from '../../../core/models/billing.models';

const PLAN_MESSAGES: Record<PlanId, { title: string; subtitle: string }> = {
	free: { title: '', subtitle: '' },
	pro: {
		title: 'Pro plan required',
		subtitle: 'Upgrade to Pro to unlock this feature — $29/mo with a 14-day free trial.',
	},
	team: {
		title: 'Team plan required',
		subtitle: 'Upgrade to Team to unlock this feature — 3 seats, 3,000 credits/month, $99/mo.',
	},
	enterprise: {
		title: 'Enterprise plan required',
		subtitle: 'Contact our team to unlock enterprise features including custom agents, SSO, and audit logs.',
	},
};

@Component({
	selector: 'app-upgrade-prompt',
	standalone: true,
	imports: [RouterLink, TitleCasePipe],
	templateUrl: './upgrade-prompt.component.html',
})
export class UpgradePromptComponent {
	readonly feature = input.required<string>();
	readonly requiredPlan = input.required<PlanId>();
	readonly variant = input<'modal' | 'inline'>('inline');
	readonly dismissed = output<void>();

	protected readonly messages = PLAN_MESSAGES;

	protected dismiss(): void {
		this.dismissed.emit();
	}
}
