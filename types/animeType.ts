export type animeType = {
    title: string,
    images: {
        jpg: {
            image_url: string,
            large_image_url: string
        }
    },
    rating: number,
    synopsis: string,
    genre: string,
    popularity: number,
    airing: boolean,
    episodes: number,
    status: string,
    score: number,
    aired: {
        from: string|Date,
        string: string
    },
    trailer: {
        embed_url: string,
    }
    entry: animeType[],
    duration: string,
    genres: [{
        name: string
    }],
    mal_id: number,
    studios: [{
        name: string
    }]
}