import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PROMPT_TEMPLATES } from '../../../../core/data/templates';
import { WorkspaceService } from '../../../../core/services/workspace.service';

@Component({
	selector: 'app-templates-grid',
	standalone: true,
	templateUrl: './templates-grid.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesGridComponent {
	private readonly workspace = inject(WorkspaceService);
	private readonly router = inject(Router);

	protected readonly templates = PROMPT_TEMPLATES;

	protected useTemplate(agentSlug: string, prompt: string): void {
		this.workspace.setNextPrompt(prompt);
		this.router.navigate(['/workspace', agentSlug]);
	}
}
