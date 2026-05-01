import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { StarterPrompt } from '../../../../core/models/workspace.models';

@Component({
	selector: 'app-prompt-panel',
	standalone: true,
	templateUrl: './prompt-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptPanelComponent {
	readonly starterPrompts = input.required<StarterPrompt[]>();
	readonly prompt = input.required<string>();
	readonly isRunning = input.required<boolean>();

	readonly promptChange = output<string>();
	readonly runClicked = output<void>();

	protected onInput(event: Event): void {
		this.promptChange.emit((event.target as HTMLTextAreaElement).value);
	}

	protected selectStarter(text: string): void {
		this.promptChange.emit(text);
	}

	protected onRun(): void {
		this.runClicked.emit();
	}
}
