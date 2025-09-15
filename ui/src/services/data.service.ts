export class DataService {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getItems<T extends GeoJSON.GeoJSON>(
        collectionId: string,
        query: string,
        signal?: AbortSignal
    ) {
        const url = new URL(
            `collections/${collectionId}/items?${query}`,
            this.url
        );

        const response = await fetch(url, {
            signal,
            headers: {
                Accept: 'application/json',
            },
        });

        const results = await response.json();

        return results as T;
    }

    async getItem<T extends GeoJSON.GeoJSON>(
        collectionId: string,
        itemId: string,
        query: string,
        signal?: AbortSignal
    ) {
        const url = new URL(
            `collections/${collectionId}/items/${itemId}?${query}`,
            this.url
        );

        const response = await fetch(url, {
            signal,
            headers: {
                Accept: 'application/json',
            },
        });

        const results = await response.json();

        return results as T;
    }
}
