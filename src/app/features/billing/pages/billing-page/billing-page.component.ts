import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BillingService } from '../../../../core/services/billing.service';
import { CreditMeterComponent } from '../../components/credit-meter/credit-meter.component';
import { UsageTableComponent } from '../../components/usage-table/usage-table.component';
import { PLAN_NAMES } from '../../../../core/models/billing.models';

@Component({
	selector: 'app-billing-page',
	standalone: true,
	imports: [RouterLink, CreditMeterComponent, UsageTableComponent],
	templateUrl: './billing-page.component.html',
})
export class BillingPageComponent {
	private readonly billing = inject(BillingService);

	protected readonly currentPlan = this.billing.currentPlan;
	protected readonly planFeatures = this.billing.planFeatures;
	protected readonly creditsUsed = this.billing.creditsUsed;
	protected readonly creditsTotal = this.billing.creditsTotal;
	protected readonly planNames = PLAN_NAMES;

	protected readonly infinity = Infinity;

	protected readonly summary = toSignal(this.billing.getBillingSummary());
	protected readonly usageStats = toSignal(this.billing.getUsageStats(), { initialValue: [] });

	protected readonly resetAt = (() => {
		const d = new Date();
		d.setMonth(d.getMonth() + 1, 1);
		d.setHours(0, 0, 0, 0);
		return d.toISOString();
	})();
}
