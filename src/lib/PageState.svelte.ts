import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';
import { timeAgo, getRemaining, formatRemaining } from '$lib/utils';

export type State = 'loading' | 'loaded' | 'not found' | 'expired' | 'deleted';

export type SubMultipliers = {
	tier1: number;
	tier2: number;
	tier3: number;
};

export type CardData = {
	_id: string;
	name: string;
	price: number;
	subPrice?: number;
	spawnCount?: number;
};

export type PageData = {
	id: string;
	channel: string;
	isPartner: boolean;
	logo: string;
	followers: number | null;
	subEnemySpawnCountMultipliers?: SubMultipliers;
	enemies: CardData[];
	events: CardData[];
	expiresAt: string;
	createdAt: string;
	updatedByOwnerAt: string | null;
	liveViewers: number;
	uniqueViews: number;
};

export interface PageState {
	state: State;
	id: string;
	channel: string;
	isPartner: boolean;
	logo: string;
	followers: number | null;
	subEnemySpawnCountMultipliers: SubMultipliers | undefined;
	enemies: CardData[];
	events: CardData[];
	expiresAt: string;
	createdAt: string;
	updatedByOwnerAt: string | null;
	liveViewers: number;
	uniqueViews: number;
	expiresInCountdown: string;
	createdAgo: string;
	updatedAgo: string;
	load: (id: string) => Promise<void>;
	unload: () => Promise<void>;
}

export class PageStateClass implements PageState {
	state = $state<State>('loading');
	id = $state('');
	channel = $state('');
	isPartner = $state(false);
	logo = $state('');
	followers = $state<number | null>(null);
	subEnemySpawnCountMultipliers = $state<SubMultipliers | undefined>(undefined);
	enemies = $state<CardData[]>([]);
	events = $state<CardData[]>([]);
	expiresAt = $state('');
	createdAt = $state('');
	updatedByOwnerAt = $state<string | null>(null);
	liveViewers = $state(0);
	uniqueViews = $state(0);
	expiresInCountdown = $state('');
	createdAgo = $state('');
	updatedAgo = $state('');

	private eventSource: EventSource | null = null;
	private sseClosed = false;

	private timerInterval: ReturnType<typeof setInterval> | null = null;

	load = async (id: string) => {
		if (this.id === id) return;

		await this.unload();

		this.id = id;
		await this.fetchData();

		this.startTimer();

		if (this.state === 'loaded') {
			await this.connectSSE();
		}
	};

	unload = async () => {
		this.stopTimer();
		await this.disconnectSSE();
	};

	private fetchData = async () => {
		this.state = 'loading';

		try {
			const res = await fetch(`${apiOrigin}/api/pages/${this.id}`);

			if (!res.ok) {
				this.state = 'not found';
				throw new Error('Failed to fetch page data');
			}

			const data: PageData = await res.json();
			this.handleData(data);
			this.state = 'loaded';
		} catch (err) {
			console.error('Fetch error:', err);
			this.state = 'not found';
		}
	};

	private connectSSE = async () => {
		if (this.state !== 'loaded' || !this.id || this.eventSource || !this.sseClosed) return;

		this.eventSource = new EventSource(`${apiOrigin}/api/pages/${this.id}/sse`);

		this.eventSource.onopen = () => {
			//console.log(`✅ Connected to page ${pageId} SSE`);
		};

		this.eventSource.onerror = () => {
			//console.error('❌ SSE connection error');
		};

		this.eventSource.addEventListener('update', (event) => {
			try {
				const data = JSON.parse(event.data);
				this.handleData(data);
			} catch (err) {
				console.warn('Invalid SSE update payload:', event.data);
			}
		});

		this.eventSource.addEventListener('live-viewers', (event) => {
			try {
				this.liveViewers = parseInt(event.data);
			} catch (err) {
				console.warn('Invalid SSE live viewers payload:', event.data);
			}
		});

		this.eventSource.addEventListener('unique-views', (event) => {
			try {
				this.uniqueViews = parseInt(event.data);
			} catch (err) {
				console.warn('Invalid SSE unique views payload:', event.data);
			}
		});

		this.eventSource.addEventListener('delete', () => {
			this.state = 'deleted';
			this.disconnectSSE();
		});
	};

	private disconnectSSE = async () => {
		if (this.eventSource) {
			this.eventSource.close();
			this.eventSource = null;
		}

		this.sseClosed = true;
	};

	private handleData = (data: Partial<PageData>) => {
		if (data.channel) this.channel = data.channel;
		if (data.isPartner) this.isPartner = data.isPartner;
		if (data.logo) this.logo = data.logo;
		if (data.followers) this.followers = data.followers;
		if (data.subEnemySpawnCountMultipliers)
			this.subEnemySpawnCountMultipliers = data.subEnemySpawnCountMultipliers;
		if (data.enemies) this.enemies = data.enemies;
		if (data.events) this.events = data.events;
		if (data.expiresAt) this.expiresAt = data.expiresAt;
		if (data.createdAt) this.createdAt = data.createdAt;
		if (data.updatedByOwnerAt !== undefined) this.updatedByOwnerAt = data.updatedByOwnerAt;
		if (data.liveViewers !== undefined) this.liveViewers = data.liveViewers;
		if (data.uniqueViews !== undefined) this.uniqueViews = data.uniqueViews;
	};

	private startTimer = () => {
		let expired = false;

		const updateTimes = () => {
			updateCreatedAgo();
			updateUpdatedAgo();
			updateExpiresInCountdown();
		};

		const updateCreatedAgo = () => {
			if (expired || !this.createdAt) return;

			this.createdAgo = timeAgo(this.createdAt);
		};

		const updateUpdatedAgo = () => {
			if (expired) return;

			if (this.updatedByOwnerAt === null) {
				this.updatedAgo = 'never';
				return;
			}

			this.updatedAgo = timeAgo(this.updatedByOwnerAt);
		};

		const updateExpiresInCountdown = () => {
			if (expired || !this.expiresAt) return;

			const remaining = getRemaining(this.expiresAt);
			expired = remaining <= 0;

			this.expiresInCountdown = expired ? 'Expired' : formatRemaining(remaining);

			if (expired) {
				this.state = 'expired';
				this.stopTimer();
			}
		};

		this.stopTimer();

		updateTimes();

		if (!expired) {
			this.timerInterval = setInterval(updateTimes, 1000);
		}
	};

	private stopTimer = () => {
		clearInterval(this.timerInterval!);
	};
}

const DEFAULT_KEY = '$_page_state';

export const getPageState = (key = DEFAULT_KEY) => {
	return getContext<PageState>(key);
};

export const setPageState = (key = DEFAULT_KEY) => {
	const pageState = new PageStateClass();
	return setContext(key, pageState);
};
