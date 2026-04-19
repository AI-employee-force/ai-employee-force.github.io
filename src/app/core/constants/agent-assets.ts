/** Portraits live in `public/agent-portraits/{slug}.svg` — not under `/agents` to avoid conflicting with the SPA route. */
const AGENT_PORTRAITS_BASE = '/agent-portraits';

/** Public URL for an agent portrait SVG. */
export function agentPortraitSrc(slug: string): string {
	return `${AGENT_PORTRAITS_BASE}/${encodeURIComponent(slug)}.svg`;
}
