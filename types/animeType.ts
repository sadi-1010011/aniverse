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
    episodes: number,
    status: string,
    aired: {
        from: string,
        string: string
    },
    entry: animeType[],
    duration: string,
    mal_id: number,
    studios: [{
        name: string
    }]
}