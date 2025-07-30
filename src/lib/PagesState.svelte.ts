import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';

export type State = 'loading' | 'loaded' | 'not found' | 'failed';

export type PageData = {
	id: string;
	channel: string;
	displayName: string;
	isPartner: boolean;
	logo: string;
	followers: number | null;
	expiresAt: string;
	createdAt: string;
	updatedByOwnerAt: string | null;
	liveViewers: number;
	uniqueViews: number;
};

interface PagesState {
	state: State;
	pages: PageData[];
	load: () => Promise<void>;
}

export class PagesStateClass implements PagesState {
	state = $state<State>('loading');
	pages = $state<PageData[]>([]);

	load = async () => {
		await this.fetchData();
	};

	private fetchData = async () => {
		this.state = 'loading';

		try {
			const res = await fetch(`${apiOrigin}/api/pages`);

			if (!res.ok) {
				console.error('Failed to fetch pages data');
				this.state = 'not found';
				return;
			}

			const data: PageData[] = await res.json();
			this.pages = data;
			this.state = 'loaded';
		} catch (err) {
			console.error('Fetch error:', err);
			this.state = 'failed';
		}
	};
}

const DEFAULT_KEY = '$_pages_state';

export const getPagesState = (key = DEFAULT_KEY) => {
	return getContext<PagesState>(key);
};

export const setPagesState = (key = DEFAULT_KEY) => {
	const pagesState = new PagesStateClass();
	return setContext(key, pagesState);
};
