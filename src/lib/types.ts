export type CardData = {
	_id: string;
	name: string;
	price: number;
	spawnCount?: number;
	subPrice?: number;
};

export type SubMultipliers = {
	tier1: number;
	tier2: number;
	tier3: number;
};

export type PageData = {
    id: string;
	channel: string;
	subEnemySpawnCountMultipliers?: SubMultipliers;
	enemies: CardData[];
	events: CardData[];
	expiresAt: string;
    createdAt: string;
    updatedAt: string;
};

export type PageCardData = {
    id: string;
    channel: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export type PageState = 'loading' | 'loaded' | 'not found' | 'expired' | 'deleted';
export type CardSort =
	| 'default'
	| 'name: a-z'
	| 'name: z-a'
	| 'price: lowest to highest'
	| 'price: highest to lowest';
