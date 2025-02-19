"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { animeType } from "@/types/animeType";
import { useRouter } from "next/navigation";

const fallbackImage = "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684327.jpg?semt=ais_hybrid";

export default function Featured() {

    const router = useRouter();
    const [featuredAnime, setFeaturedAnime] = useState<animeType[] | null>(null);

    // Fetch TopAnime
    const getFeaturedAnime = async () => {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?page=1');
            const anime = await response.json();
            if (anime && anime.data) {
                setFeaturedAnime(anime.data.slice(0, 8));
            }
        } catch (error) {
            console.error("Failed to fetch featured anime:", error);
        }
    }

    useEffect(() => {
        getFeaturedAnime();
    }, [])

    return (
            <Carousel autoPlay infiniteLoop interval={4500} showArrows={false} showStatus={false} showIndicators={false} showThumbs={false} swipeable className="mb-6">
                {
                    featuredAnime?.map((anime: animeType, i: number) => (
                        <div onClick={() => router.push(`/anime/${anime.mal_id}`)} key={i} className="relative h-[40svh]">
                            <div className="absolute inset-0">
                                <Image
                                    priority
                                    width={500}
                                    height={500}
                                    src={anime.images.jpg.large_image_url || fallbackImage}
                                    alt={anime.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            </div>
                            <div className="absolute top-2 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs">
                                Featured
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                                <h2 className="text-xl font-bold mb-1">{anime.title}</h2>
                                <div className="flex items-center mb-1">
                                    <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                                    <span>{anime.rating}</span>
                                </div>
                                {/* DESCRIPTION */}
                                {/* <p className="text-sm opacity-90">{anime.synopsis.slice(0, 64) + '...'}</p> */}
                            </div>
                        </div>
                    ))
                }
            </Carousel>
        )
};
