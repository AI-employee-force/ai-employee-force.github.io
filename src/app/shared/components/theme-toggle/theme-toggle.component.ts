import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
	selector: 'app-theme-toggle',
	templateUrl: './theme-toggle.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
	readonly compact = input(false);

	private readonly theme = inject(ThemeService);

	protected readonly preference = this.theme.preference;

	protected readonly isLight = computed(() => this.preference() === 'light');

	protected readonly ariaLabel = computed(() =>
		this.isLight() ? 'Switch to dark theme' : 'Switch to light theme',
	);

	protected readonly btnClass = computed(() => {
		const base =
			'inline-flex shrink-0 items-center justify-center rounded-full border font-medium outline-none transition-all duration-200 ' +
			'border-slate-300/90 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md ' +
			'hover:border-cyan-400/45 hover:bg-white hover:text-slate-900 hover:shadow-[0_4px_20px_-6px_rgba(34,211,238,0.35)] ' +
			'focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-violet-50 ' +
			'active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 ' +
			'dark:border-white/15 dark:bg-white/[0.08] dark:text-slate-200 dark:hover:border-violet-400/35 dark:hover:bg-white/[0.12] dark:hover:text-white dark:focus-visible:ring-offset-[#0b0a14]';
		return this.compact() ? `${base} h-9 w-9` : `${base} h-10 w-10`;
	});

	protected readonly iconClass = computed(() => (this.compact() ? 'h-[1.15rem] w-[1.15rem]' : 'h-5 w-5'));

	toggle(): void {
		this.theme.setPreference(this.preference() === 'light' ? 'dark' : 'light');
	}
}
