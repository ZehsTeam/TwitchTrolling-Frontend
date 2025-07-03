import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';

export type PageData = {
	id: string;
	channel: string;
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	pageViewers?: number;
};

interface PagesState {
	pages: PageData[];
	load: () => Promise<void>;
}

export class PagesStateClass implements PagesState {
	pages = $state<PageData[]>([]);

	load = async () => {
		await this.fetchData();
	};

	private fetchData = async () => {
		try {
			const res = await fetch(`${apiOrigin}/api/pages`);

			if (!res.ok) {
				throw new Error('Failed to fetch page data');
			}

			const data: PageData[] = await res.json();
			this.pages = data;
		} catch (err) {
			console.error('Fetch error:', err);
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
