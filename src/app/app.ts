import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { SeoRouteListenerService } from './core/services/seo-route-listener.service';
import { AppSidebarComponent } from './shared/components/app-sidebar/app-sidebar.component';
import { AppTopBarComponent } from './shared/components/app-topbar/app-topbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, FooterComponent, AppSidebarComponent, AppTopBarComponent],
	templateUrl: './app.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	private readonly router = inject(Router);

	constructor() {
		inject(SeoRouteListenerService);
	}

	protected readonly isAppLayout = toSignal(
		this.router.events.pipe(
			filter((e) => e instanceof NavigationEnd),
			startWith(null),
			map(() => this._findLayout(this.router.routerState.snapshot.root) === 'app'),
		),
		{ initialValue: false },
	);

	private _findLayout(route: ActivatedRouteSnapshot): string | null {
		if (route.data['layout']) return route.data['layout'] as string;
		for (const child of route.children) {
			const found = this._findLayout(child);
			if (found) return found;
		}
		return null;
	}
}
