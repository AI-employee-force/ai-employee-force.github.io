import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

const PAGE_TITLES: Record<string, string> = {
	dashboard: 'Dashboard',
	agents: 'Marketplace',
	workspace: 'Workspace',
	runs: 'Run History',
};

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [ThemeToggleComponent],
	templateUrl: './app-topbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent {
	private readonly router = inject(Router);

	protected readonly pageTitle = computed(() => {
		const url = this.router.url;
		const segment = url.split('/').filter(Boolean)[0] ?? '';
		return PAGE_TITLES[segment] ?? 'AI Employee Force';
	});
}
