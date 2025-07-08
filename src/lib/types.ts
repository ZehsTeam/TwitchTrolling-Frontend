export interface BaseListItem {
    getId: () => string;
    [key: string]: unknown; // Allows flexibility
}
