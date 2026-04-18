import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
	selector: 'app-section-heading',
	templateUrl: './section-heading.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block',
	},
})
export class SectionHeadingComponent {
	/** Small label above the title (e.g. “Marketplace”). */
	readonly eyebrow = input<string>();
	readonly title = input.required<string>();
	readonly subtitle = input<string>();
	readonly align = input<'left' | 'center'>('left');
	/** Tighter vertical rhythm for dense pages (e.g. agent profile). */
	readonly density = input<'default' | 'compact'>('default');
	/** Document outline level for the primary line. */
	readonly headingLevel = input<2 | 3>(2);
	/** Optional `id` on the title element for `aria-labelledby`. */
	readonly titleId = input<string | undefined>(undefined);
	readonly eyebrowId = input<string | undefined>(undefined);

	protected readonly containerClass = computed(() => {
		const align = this.align() === 'center' ? 'mx-auto text-center' : '';
		const mb = this.density() === 'compact' ? 'mb-6 md:mb-8' : 'mb-8 md:mb-10';
		return `max-w-3xl ${mb} ${align}`.trim();
	});

	protected readonly titleClass = computed(() => {
		const base =
			'font-bold tracking-tight text-slate-900 dark:text-slate-100 [&:not(:last-child)]:mb-3';
		if (this.headingLevel() === 2) {
			return `${base} text-2xl md:text-3xl lg:text-4xl`;
		}
		return `${base} text-xl md:text-2xl lg:text-3xl`;
	});
}
