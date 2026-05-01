import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const MILESTONES = [1, 3, 5, 10, 25];

@Component({
	selector: 'app-milestone-card',
	standalone: true,
	templateUrl: './milestone-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MilestoneCardComponent {
	readonly completedCount = input.required<number>();
	readonly hasChained = input.required<boolean>();

	protected readonly nextMilestone = computed(() => {
		const n = this.completedCount();
		return MILESTONES.find((m) => m > n) ?? null;
	});

	protected readonly nearestAchieved = computed(() => {
		const n = this.completedCount();
		return [...MILESTONES].reverse().find((m) => m <= n) ?? null;
	});

	protected readonly message = computed(() => {
		const n = this.completedCount();
		const s = n === 1 ? '' : 's';
		if (n === 0) return 'Run your first AI employee task.';
		if (n < 3) return `You completed ${n} task${s}. Try chaining Producto → Fronto → Testo.`;
		if (n < 5) return `${n} tasks done. You're building momentum.`;
		return `${n} tasks shipped with your AI workforce.`;
	});

	protected readonly showChainTip = computed(() => !this.hasChained() && this.completedCount() >= 1);
}
