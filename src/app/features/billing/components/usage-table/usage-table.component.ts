import { Component, input } from '@angular/core';
import type { UsageStat } from '../../../../core/models/billing.models';

@Component({
	selector: 'app-usage-table',
	standalone: true,
	templateUrl: './usage-table.component.html',
})
export class UsageTableComponent {
	readonly stats = input.required<UsageStat[]>();
}
