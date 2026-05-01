import type { AgentTier } from './site.models';

export type PlanId = 'free' | 'pro' | 'team' | 'enterprise';

export interface PlanFeatures {
	monthlyCredits: number;
	maxInstalledAgents: number;
	maxSeats: number;
	historyRetentionDays: number;
	streaming: boolean;
	chains: boolean;
	priorityQueue: boolean;
	agentTiers: AgentTier[];
}

export const PLAN_FEATURES: Record<PlanId, PlanFeatures> = {
	free: {
		monthlyCredits: 20,
		maxInstalledAgents: 3,
		maxSeats: 1,
		historyRetentionDays: 7,
		streaming: false,
		chains: false,
		priorityQueue: false,
		agentTiers: ['free'],
	},
	pro: {
		monthlyCredits: 600,
		maxInstalledAgents: 15,
		maxSeats: 1,
		historyRetentionDays: 90,
		streaming: true,
		chains: true,
		priorityQueue: false,
		agentTiers: ['free', 'pro'],
	},
	team: {
		monthlyCredits: 3000,
		maxInstalledAgents: Infinity,
		maxSeats: 3,
		historyRetentionDays: 365,
		streaming: true,
		chains: true,
		priorityQueue: true,
		agentTiers: ['free', 'pro', 'premium'],
	},
	enterprise: {
		monthlyCredits: Infinity,
		maxInstalledAgents: Infinity,
		maxSeats: Infinity,
		historyRetentionDays: Infinity,
		streaming: true,
		chains: true,
		priorityQueue: true,
		agentTiers: ['free', 'pro', 'premium', 'enterprise'],
	},
};

export const PLAN_PRICES: Record<PlanId, number | null> = {
	free: 0,
	pro: 29,
	team: 99,
	enterprise: null,
};

export const PLAN_NAMES: Record<PlanId, string> = {
	free: 'Free',
	pro: 'Pro',
	team: 'Team',
	enterprise: 'Enterprise',
};

export interface BillingSummary {
	planId: PlanId;
	planName: string;
	creditsUsed: number;
	creditsTotal: number;
	creditsResetAt: string;  // ISO date
	seats: number;
	maxSeats: number;
	nextBillingDate: string | null;
	monthlyPrice: number | null;
}

export interface UsageStat {
	agentSlug: string;
	agentName: string;
	runsThisMonth: number;
	creditsConsumed: number;
}

export interface CreditTopUp {
	credits: number;
	price: number;
	label: string;
}

export const CREDIT_TOP_UPS: CreditTopUp[] = [
	{ credits: 100, price: 9, label: 'Starter boost' },
	{ credits: 500, price: 39, label: 'Power pack' },
	{ credits: 2000, price: 129, label: 'Scale pack' },
];
