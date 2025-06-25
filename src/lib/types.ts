export type CardData = {
    _id: string;
    name: string;
    price: number;
};

export type PageData = {
    id: string;
    channel: string;
    enemies: CardData[];
    events: CardData[];
    expiresAt: string;
};

export type PageState = "loading" | "loaded" | "not found" | "expired" | "deleted";
export type CardFilter = "none" | "name" | "price";
export type CardPriceFilter = "lowest to highest" | "highest to lowest";