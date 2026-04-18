import { DOCUMENT } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PRIMARY_NAV, BRAND_LOGO_SRC, BRAND_NAME } from '../../../core/constants/navigation';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
	selector: 'app-header',
	imports: [RouterLink, RouterLinkActive, PrimaryButtonComponent, ThemeToggleComponent],
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full shrink-0',
	},
})
export class HeaderComponent {
	private readonly doc = inject(DOCUMENT);

	protected readonly nav = PRIMARY_NAV;
	protected readonly brand = BRAND_NAME;
	protected readonly logoSrc = BRAND_LOGO_SRC;
	protected readonly menuOpen = signal(false);

	protected readonly headerScrolled = signal(false);

	constructor() {
		effect(() => {
			const open = this.menuOpen();
			this.doc.body.style.overflow = open ? 'hidden' : '';
		});
	}

	protected readonly shellClass = computed(() => {
		const scrolled = this.headerScrolled();
		/** `fixed` pins to the viewport; `sticky` breaks if any ancestor sets overflow/transform. Do not add `relative` here. */
		const base =
			'fixed top-0 left-0 right-0 z-[100] w-full border-b backdrop-blur-xl transition-[box-shadow,background-color,border-color] duration-300 ease-out';
		return scrolled
			? `${base} border-slate-200/95 bg-white/92 shadow-[0_14px_44px_-18px_rgba(15,23,42,0.16)] dark:border-white/12 dark:bg-[#0b0a14]/94 dark:shadow-[0_18px_56px_-14px_rgba(0,0,0,0.58)]`
			: `${base} border-slate-200/80 bg-white/82 shadow-none dark:border-white/10 dark:bg-[#0b0a14]/86`;
	});

	@HostListener('window:scroll')
	protected onWindowScroll(): void {
		const y = typeof globalThis.scrollY === 'number' ? globalThis.scrollY : 0;
		this.headerScrolled.set(y > 14);
	}

	@HostListener('document:keydown.escape')
	protected onEscape(): void {
		if (this.menuOpen()) {
			this.closeMenu();
		}
	}

	toggleMenu(): void {
		this.menuOpen.update((v) => !v);
	}

	closeMenu(): void {
		this.menuOpen.set(false);
	}
}
