import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-primary-button',
	imports: [RouterLink, NgTemplateOutlet],
	templateUrl: './primary-button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
	readonly label = input.required<string>();
	readonly href = input<string | undefined>(undefined);
	readonly variant = input<'primary' | 'ghost' | 'outline'>('primary');
	/** For native `<button>` usage (e.g. form submit). Ignored when `href` is set. */
	readonly nativeButtonType = input<'button' | 'submit' | 'reset'>('button');
	readonly disabled = input(false);
	/** Overrides visible label for assistive tech when the action differs from `label`. */
	readonly ariaLabel = input<string | undefined>(undefined);

	protected readonly isExternal = computed(() => {
		const h = this.href();
		return !!h && /^https?:\/\//i.test(h);
	});

	protected readonly hostClass = computed(() => {
		const v = this.variant();
		const motion =
			'motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-300 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]';
		const focus =
			'outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/85 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-50 dark:focus-visible:ring-offset-[#0b0a14]';
		const base = `btn-ai group relative inline-flex min-h-[2.75rem] select-none items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide no-underline ${motion} ${focus}`;

		if (v === 'primary') {
			return (
				base +
				' border border-white/15 text-white shadow-[0_4px_28px_-6px_rgba(34,211,238,0.5),0_14px_44px_-14px_rgba(124,58,237,0.45)] hover:border-white/25 hover:shadow-[0_8px_40px_-4px_rgba(34,211,238,0.6),0_18px_52px_-12px_rgba(217,70,239,0.35)]'
			);
		}
		if (v === 'ghost') {
			return (
				base +
				' border border-slate-300/90 bg-white/60 shadow-sm backdrop-blur-md hover:border-cyan-400/40 hover:bg-white/85 hover:shadow-[0_10px_40px_-16px_rgba(34,211,238,0.35)] dark:border-white/14 dark:bg-white/[0.07] dark:hover:border-violet-400/35 dark:hover:bg-white/[0.12]'
			);
		}
		return (
			base +
			' border-2 border-slate-400/45 bg-transparent text-slate-800 hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-500/15 hover:via-violet-500/12 hover:to-fuchsia-500/15 hover:shadow-[0_0_32px_-8px_rgba(34,211,238,0.35)] dark:border-white/25 dark:text-slate-100 dark:hover:border-cyan-400/30 dark:hover:from-cyan-400/10 dark:hover:via-violet-500/10 dark:hover:to-fuchsia-500/10'
		);
	});
}
