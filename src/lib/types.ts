export type SubMultipliers = {
	tier1: number;
	tier2: number;
	tier3: number;
};

export type Raid = {
	viewersPerRandomEnemy: number;
	maxEnemySpawnCount: number;
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
	displayName: string;
	isPartner: boolean;
	logo: string;
	followers: number | null;
	cheerEnabled: boolean;
	subEnabled: boolean;
	raidEnabled: boolean;
	enemies: CardData[];
	events: CardData[];
	raid?: Raid | undefined;
	subEnemySpawnCountMultipliers?: SubMultipliers;
	createdAt: string;
	updatedByOwnerAt: string | null;
	expiresAt: string | null;
	liveViewers: number;
	uniqueViews: number;
};

export type PageDataCompact = Pick<
	PageData,
	| 'id'
	| 'channel'
	| 'displayName'
	| 'isPartner'
	| 'logo'
	| 'followers'
	| 'expiresAt'
	| 'createdAt'
	| 'updatedByOwnerAt'
	| 'liveViewers'
	| 'uniqueViews'
>;
