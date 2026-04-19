import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND_LOGO_SRC, BRAND_NAME, FOOTER_NAV_SECTIONS } from '../../../core/constants/navigation';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

@Component({
	selector: 'app-footer',
	imports: [RouterLink, PrimaryButtonComponent],
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	protected readonly sections = FOOTER_NAV_SECTIONS;
	protected readonly brand = BRAND_NAME;
	protected readonly logoSrc = BRAND_LOGO_SRC;
	protected readonly year = new Date().getFullYear();
}
