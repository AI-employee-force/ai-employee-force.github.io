import type { AgentCategory } from './site.models';

export type RunStatus = 'completed' | 'running' | 'failed';

export interface Run {
  id: string;
  agentSlug: string;
  agentName: string;
  agentCategory: AgentCategory;
  promptPreview: string;
  fullPrompt: string;
  status: RunStatus;
  timestamp: string;
  outputSummary?: string;
  workspaceOutput?: WorkspaceOutput;
  saved?: boolean;
}

export interface StarterPrompt {
  id: string;
  label: string;
  text: string;
}

export interface WorkspaceOutput {
  overview: string;
  details: string[];
  actions: string[];
  followUps: string[];
}

export interface WorkspaceState {
  agentSlug: string;
  prompt: string;
  isRunning: boolean;
  hasResult: boolean;
  output: WorkspaceOutput | null;
  activeTab: 'overview' | 'details' | 'actions';
  starterPrompts: StarterPrompt[];
}

export interface InstalledAgent {
  slug: string;
  installedAt: string;
  lastRunAt: string | null;
  runCount: number;
}

// ─── Execution lifecycle ──────────────────────────────────────────────────────

export type AgentRunStage = 'idle' | 'analyzing' | 'generating' | 'completed' | 'failed';

export type AgentRunStatus = 'loading' | 'success' | 'error';

// ─── Structured per-agent output types ───────────────────────────────────────

export interface ProductoRunOutput {
  productSummary: string;
  features: { title: string; description: string }[];
  roadmap: { phase: string; items: string[] }[];
}

export interface FrontoRunOutput {
  uiComponents: { name: string; description: string; props: string[] }[];
  layout: { region: string; description: string }[];
  designSystem: { token: string; value: string; usage: string }[];
}

export interface TestoRunOutput {
  testCases: { id: string; title: string; steps: string[]; expected: string }[];
  edgeCases: string[];
  qaChecklist: { item: string; priority: 'high' | 'medium' | 'low' }[];
}

export type TypedAgentOutput = ProductoRunOutput | FrontoRunOutput | TestoRunOutput;

// ─── In-memory run record ─────────────────────────────────────────────────────

export interface AgentRunRecord {
  id: string;
  agentSlug: string;
  agentName: string;
  prompt: string;
  promptPreview: string;
  stage: AgentRunStage;
  status: AgentRunStatus;
  startedAt: string;
  completedAt: string | null;
  typedOutput: TypedAgentOutput | null;
  workspaceOutput: WorkspaceOutput | null;
  errorMessage: string | null;
}

// ─── Agent chain ──────────────────────────────────────────────────────────────

export interface AgentChainStep {
  agentSlug: string;
  agentName: string;
  prompt: string;
  output: WorkspaceOutput;
  completedAt: string; // ISO 8601
}

export interface AgentChain {
  id: string;
  /** Completed steps only — the current agent is not yet in this array. */
  steps: AgentChainStep[];
}
