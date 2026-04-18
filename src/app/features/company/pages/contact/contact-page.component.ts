import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-contact-page',
	imports: [FormsModule, PrimaryButtonComponent, SectionHeadingComponent, RevealOnScrollDirective],
	templateUrl: './contact-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
	protected fullName = '';
	protected workEmail = '';
	protected company = '';
	protected message = '';
	protected readonly submitted = signal(false);

	submit(): void {
		this.submitted.set(true);
	}
}
