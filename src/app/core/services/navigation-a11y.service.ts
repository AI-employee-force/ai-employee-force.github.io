import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

const MAIN_ID = 'main';

@Injectable({ providedIn: 'root' })
export class NavigationA11yService {
	private readonly doc = inject(DOCUMENT);

	focusMain(): void {
		queueMicrotask(() => {
			const el = this.doc.getElementById(MAIN_ID);
			if (el && 'focus' in el) {
				(el as HTMLElement).focus({ preventScroll: true });
			}
		});
	}
}
