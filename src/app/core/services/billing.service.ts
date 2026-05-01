import { Injectable, signal, computed } from '@angular/core';
import { of, type Observable } from 'rxjs';
import type { AgentTier } from '../models/site.models';
import {
	type BillingSummary,
	type PlanId,
	type UsageStat,
	PLAN_FEATURES,
	PLAN_NAMES,
	PLAN_PRICES,
} from '../models/billing.models';

@Injectable({ providedIn: 'root' })
export class BillingService {
	/** Current active plan — defaults to free until auth is wired */
	readonly currentPlan = signal<PlanId>('free');

	readonly planFeatures = computed(() => PLAN_FEATURES[this.currentPlan()]);

	readonly canStream = computed(() => this.planFeatures().streaming);
	readonly canChain = computed(() => this.planFeatures().chains);

	/** Reactive credit tracking (mock) */
	private readonly _creditsUsed = signal(0);
	readonly creditsUsed = this._creditsUsed.asReadonly();
	readonly creditsTotal = computed(() => this.planFeatures().monthlyCredits);
	readonly creditsRemaining = computed(() => {
		const total = this.creditsTotal();
		return total === Infinity ? Infinity : total - this._creditsUsed();
	});
	readonly creditPercent = computed(() => {
		const total = this.creditsTotal();
		if (total === Infinity) return 0;
		return Math.min(100, Math.round((this._creditsUsed() / total) * 100));
	});

	canUseAgent(agentTier: AgentTier): boolean {
		return (this.planFeatures().agentTiers as AgentTier[]).includes(agentTier);
	}

	canRun(): boolean {
		return this.creditsRemaining() > 0;
	}

	canInstallMore(currentCount: number): boolean {
		const max = this.planFeatures().maxInstalledAgents;
		return max === Infinity || currentCount < max;
	}

	/** Called by runner service after a successful run */
	deductCredits(credits: number): void {
		this._creditsUsed.update((used) => used + credits);
	}

	getBillingSummary(): Observable<BillingSummary> {
		const planId = this.currentPlan();
		const total = this.planFeatures().monthlyCredits;
		const resetDate = new Date();
		resetDate.setMonth(resetDate.getMonth() + 1, 1);
		resetDate.setHours(0, 0, 0, 0);

		return of({
			planId,
			planName: PLAN_NAMES[planId],
			creditsUsed: this._creditsUsed(),
			creditsTotal: total === Infinity ? -1 : total,
			creditsResetAt: resetDate.toISOString(),
			seats: 1,
			maxSeats: this.planFeatures().maxSeats === Infinity ? -1 : this.planFeatures().maxSeats,
			nextBillingDate: planId === 'free' ? null : resetDate.toISOString(),
			monthlyPrice: PLAN_PRICES[planId],
		});
	}

	getUsageStats(): Observable<UsageStat[]> {
		// Mock — will be replaced with real API call
		return of([]);
	}

	/** Upgrade required plan for a given agent tier */
	requiredPlanFor(agentTier: AgentTier): PlanId {
		switch (agentTier) {
			case 'free': return 'free';
			case 'pro': return 'pro';
			case 'premium': return 'team';
			case 'enterprise': return 'enterprise';
		}
	}
}
