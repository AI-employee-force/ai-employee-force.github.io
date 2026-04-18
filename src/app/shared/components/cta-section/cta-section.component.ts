import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CtaConfig } from '../../../core/models/site.models';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
	selector: 'app-cta-section',
	imports: [PrimaryButtonComponent],
	templateUrl: './cta-section.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {
	readonly config = input.required<CtaConfig>();
}
