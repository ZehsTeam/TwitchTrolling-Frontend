import { getContext, setContext } from 'svelte';
import { apiOrigin } from '$lib/config';
import type { PageDataCompact } from '$lib/types';

export type State = 'loading' | 'loaded' | 'not found' | 'failed';

interface PagesState {
	state: State;
	pages: PageDataCompact[];
	load: () => Promise<void>;
}

export class PagesStateClass implements PagesState {
	state = $state<State>('loading');
	pages = $state<PageDataCompact[]>([]);

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

			const data: PageDataCompact[] = await res.json();
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
