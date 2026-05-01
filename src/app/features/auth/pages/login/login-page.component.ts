import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './login-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);

	protected email = '';
	protected readonly submitting = signal(false);
	protected readonly error = signal<string | null>(null);

	protected onEmailChange(value: string): void {
		this.email = value;
		this.error.set(null);
	}

	protected submit(): void {
		const email = this.email.trim();
		if (!email || !email.includes('@')) {
			this.error.set('Please enter a valid email address.');
			return;
		}
		this.submitting.set(true);
		this.authService.login(email);
		const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
		this.router.navigateByUrl(returnUrl);
	}

	protected onKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') this.submit();
	}
}
