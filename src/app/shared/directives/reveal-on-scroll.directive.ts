import { Directive, ElementRef, inject, input, NgZone, OnDestroy, AfterViewInit } from '@angular/core';

/**
 * Fades/slides the host element into view when it enters the viewport.
 * Respects `prefers-reduced-motion`.
 */
@Directive({
	selector: '[appReveal]',
	standalone: true,
	host: {
		class: 'reveal',
	},
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
	private readonly el = inject(ElementRef<HTMLElement>);
	private readonly ngZone = inject(NgZone);

	/** Extra delay before transition starts (ms), for staggered lists */
	readonly revealDelayMs = input(0);

	private observer?: IntersectionObserver;

	ngAfterViewInit(): void {
		const host = this.el.nativeElement;
		const delay = this.revealDelayMs();
		if (delay > 0) {
			host.style.transitionDelay = `${delay}ms`;
		}

		if (typeof IntersectionObserver === 'undefined') {
			host.classList.add('reveal-visible');
			return;
		}

		const mq = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
		if (mq?.matches) {
			host.classList.add('reveal-visible');
			return;
		}

		this.ngZone.runOutsideAngular(() => {
			this.observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						// Use `threshold: 0` (not 0.06): a single tall host (e.g. whole marketplace page) can have
						// intersectionRatio below 6% of its own area, so a 0.06 threshold never fired.
						if (entry.isIntersecting) {
							this.ngZone.run(() => {
								entry.target.classList.add('reveal-visible');
								this.observer?.unobserve(entry.target);
							});
						}
					}
				},
				{ threshold: 0, rootMargin: '0px 0px -8% 0px' },
			);
			this.observer.observe(host);
		});
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
