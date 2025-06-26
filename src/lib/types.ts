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

export type PageState = "loading" | "loaded" | "not found" | "expired" | "deleted";
export type CardSort = "default" | "name";
export type CardSortPrice = "default" | "lowest to highest" | "highest to lowest";