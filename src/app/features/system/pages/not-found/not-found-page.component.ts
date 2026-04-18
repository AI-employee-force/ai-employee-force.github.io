import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
	selector: 'app-not-found-page',
	imports: [PrimaryButtonComponent, RevealOnScrollDirective],
	templateUrl: './not-found-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}
