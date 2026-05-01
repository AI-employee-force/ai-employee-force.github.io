import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { WorkspaceOutput } from '../../../../core/models/workspace.models';
import { FeedbackWidgetComponent } from '../../../../shared/components/feedback-widget/feedback-widget.component';

type OutputTab = 'overview' | 'details' | 'actions';

@Component({
	selector: 'app-output-panel',
	standalone: true,
	imports: [FeedbackWidgetComponent],
	templateUrl: './output-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputPanelComponent {
	readonly output = input.required<WorkspaceOutput | null>();
	readonly isRunning = input.required<boolean>();
	readonly hasResult = input.required<boolean>();
	readonly activeTab = input.required<OutputTab>();
	readonly isSaved = input<boolean>(false);
	readonly runId = input<string | null>(null);

	readonly tabChange = output<OutputTab>();
	readonly resetClicked = output<void>();
	readonly followUpSelected = output<string>();
	readonly saveRequested = output<void>();

	protected readonly tabs: { id: OutputTab; label: string }[] = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'details', label: 'Details' },
		{ id: 'actions', label: 'Actions' },
	];

	protected selectTab(id: OutputTab): void {
		this.tabChange.emit(id);
	}

	protected reset(): void {
		this.resetClicked.emit();
	}

	protected onFollowUp(text: string): void {
		this.followUpSelected.emit(text);
	}

	protected onSave(): void {
		this.saveRequested.emit();
	}

	protected tabBtnClass(id: OutputTab): string {
		const active = this.activeTab() === id;
		const base =
			'relative rounded-t-lg px-4 py-2.5 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-50';
		if (active) {
			return `${base} text-slate-900 dark:text-white after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-cyan-500`;
		}
		return `${base} text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200`;
	}
}
