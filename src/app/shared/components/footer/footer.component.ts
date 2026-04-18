import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRIMARY_NAV, BRAND_LOGO_SRC, BRAND_NAME } from '../../../core/constants/navigation';

@Component({
	selector: 'app-footer',
	imports: [RouterLink],
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	protected readonly nav = PRIMARY_NAV;
	protected readonly brand = BRAND_NAME;
	protected readonly logoSrc = BRAND_LOGO_SRC;
	protected readonly year = new Date().getFullYear();
}
