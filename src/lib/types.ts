export type CardData = {
	_id: string;
	name: string;
	price: number;
};

export type PageData = {
	channel: string;
	enemies: CardData[];
	events: CardData[];
	expiresAt: string;
};

export type PageState = 'loading' | 'loaded' | 'not found' | 'expired' | 'deleted';
export type CardSort =
	| 'default'
	| 'name: a-z'
	| 'name: z-a'
	| 'price: lowest to highest'
	| 'price: highest to lowest';
