import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { WorkspaceOutput } from '../models/workspace.models';

interface ApiRunResponse {
	workspaceOutput: WorkspaceOutput | null;
	status: 'loading' | 'success' | 'error';
	errorMessage: string | null;
}

@Injectable({ providedIn: 'root' })
export class AgentApiService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = environment.apiBaseUrl;

	run(agentSlug: string, prompt: string, chainId?: string): Observable<WorkspaceOutput> {
		const body = { agentSlug, prompt, ...(chainId ? { chainId } : {}) };
		return this.http
			.post<ApiRunResponse>(`${this.baseUrl}/agents/run`, body)
			.pipe(
				timeout(10_000),
				map((res) => {
					if (res.status === 'error' || !res.workspaceOutput) {
						throw new Error(res.errorMessage ?? 'Agent run returned no output');
					}
					return res.workspaceOutput;
				}),
			);
	}
}
