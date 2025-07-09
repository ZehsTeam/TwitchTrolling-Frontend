import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';
import { timeAgo, getRemaining, formatRemaining } from '$lib/utils';

export type State = 'loading' | 'loaded' | 'not found' | 'expired' | 'deleted';

export type SubMultipliers = {
	tier1: number;
	tier2: number;
	tier3: number;
};

export type EffectData = {
	_id: string;
	name: string;
	price: number;
	subPrice?: number;
	spawnCount?: number;
};

export type PageData = {
	id: string;
	channel: string;
	subEnemySpawnCountMultipliers?: SubMultipliers;
	enemies: EffectData[];
	events: EffectData[];
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	pageViewers?: number;
};

interface PageState {
	state: State;
	id: string;
	channel: string;
	subEnemySpawnCountMultipliers: SubMultipliers | undefined;
	enemies: EffectData[];
	events: EffectData[];
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	pageViewers: number;
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
	subEnemySpawnCountMultipliers = $state<SubMultipliers | undefined>(undefined);
	enemies = $state<EffectData[]>([]);
	events = $state<EffectData[]>([]);
	expiresAt = $state('');
	createdAt = $state('');
	updatedAt = $state('');
	pageViewers = $state(0);
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

		this.eventSource.addEventListener('page-viewers', (event) => {
			try {
				this.pageViewers = parseInt(event.data);
			} catch (err) {
				console.warn('Invalid SSE viewers payload:', event.data);
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
		if (data.subEnemySpawnCountMultipliers)
			this.subEnemySpawnCountMultipliers = data.subEnemySpawnCountMultipliers;
		if (data.enemies) this.enemies = data.enemies;
		if (data.events) this.events = data.events;
		if (data.expiresAt) this.expiresAt = data.expiresAt;
		if (data.createdAt) this.createdAt = data.createdAt;
		if (data.updatedAt) this.updatedAt = data.updatedAt;
		if (data.pageViewers) this.pageViewers = data.pageViewers;
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
			if (expired || !this.updatedAt) return;

			if (this.updatedAt === this.createdAt) {
				this.updatedAgo = 'never';
			} else {
				this.updatedAgo = timeAgo(this.updatedAt);
			}
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
