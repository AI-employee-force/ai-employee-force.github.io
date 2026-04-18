import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-demo-page',
	imports: [FormsModule, SectionHeadingComponent, PrimaryButtonComponent, RevealOnScrollDirective],
	templateUrl: './demo-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoPageComponent {
	protected company = '';
	protected email = '';
	protected interest: 'marketplace' | 'governance' | 'orchestration' | 'other' = 'marketplace';
	protected readonly submitted = signal(false);

	requestDemo(): void {
		this.submitted.set(true);
	}
}
