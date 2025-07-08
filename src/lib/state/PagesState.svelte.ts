import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';
import type { BaseListItem } from '$lib/types';

export interface PageData extends BaseListItem {
	id: string;
	game?: string;
	channel: string;
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	pageViewers?: number;
}

interface PagesState {
	pages: PageData[];
	game: string;
	load: () => Promise<void>;
}

export class PagesStateClass implements PagesState {
	pages = $state<PageData[]>([]);
	game = '';

	constructor(game: string) {
		this.game = game;
	}

	load = async () => {
		await this.fetchData();
	};

	private fetchData = async () => {
		try {
			const res = await fetch(`${apiOrigin}/api/pages`);

			if (!res.ok) {
				throw new Error('Failed to fetch pages data');
			}

			const data: PageData[] = await res.json();

			data.forEach((page) => {
				page.getId = () => page.id;
				page.game = this.game;
			});

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

export const setPagesState = (game: string, key = DEFAULT_KEY) => {
	const pagesState = new PagesStateClass(game);
	return setContext(key, pagesState);
};
