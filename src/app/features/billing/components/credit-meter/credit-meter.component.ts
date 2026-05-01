import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-credit-meter',
	standalone: true,
	imports: [DecimalPipe],
	templateUrl: './credit-meter.component.html',
})
export class CreditMeterComponent {
	readonly used = input.required<number>();
	readonly total = input.required<number>();
	readonly resetAt = input.required<string>();

	protected readonly isUnlimited = computed(() => this.total() === -1);
	protected readonly percent = computed(() => {
		if (this.isUnlimited()) return 0;
		return Math.min(100, Math.round((this.used() / this.total()) * 100));
	});
	protected readonly remaining = computed(() => {
		if (this.isUnlimited()) return -1;
		return Math.max(0, this.total() - this.used());
	});
	protected readonly colorClass = computed(() => {
		const p = this.percent();
		if (p >= 90) return 'text-red-400';
		if (p >= 70) return 'text-amber-400';
		return 'text-emerald-400';
	});
	protected readonly barClass = computed(() => {
		const p = this.percent();
		if (p >= 90) return 'bg-red-500';
		if (p >= 70) return 'bg-amber-500';
		return 'bg-emerald-500';
	});
	protected readonly resetDate = computed(() => {
		return new Date(this.resetAt()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	});
}
