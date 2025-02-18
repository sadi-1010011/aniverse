"use client";

import { fallbackImage } from "@/lib/fallbackimage";
import { animeType } from "@/types/animeType";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function RecommendedAnime() {

    const router = useRouter();
    const [recommendedAnime, setRecommendedAnime] = useState<animeType[]>([]);

    // Fetch Recommded
    const getRecommendedAnime = async () => {
        const anime = await fetch('https://api.jikan.moe/v4/recommendations/anime?page=1').then(res => res.json());
        if (anime) setRecommendedAnime(anime.data.slice(0,4));
    }

    useEffect(() => {
        getRecommendedAnime()
    }, [])


    return (
        <div className="pb-8">
        {/* Recommended Section */}
        <div className="px-4">
          <h3 className="text-lg font-bold mb-4">Recommended for You</h3>
          <div className="grid grid-cols-2 gap-4">
            { recommendedAnime.length > 0 && recommendedAnime.map((anime: animeType, i: number) => (
              <div onClick={()=> router.push(`/anime/${String(anime.mal_id).split('-')[0]}`)} key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <Image
                    width={500}
                    height={500}
                    src={anime.entry[0].images.jpg.image_url || fallbackImage} 
                    alt={anime.title || 'anime poster'}
                    className="w-full h-32 object-cover"
                  />
                </div>

                <div className="p-3">
                  <h4 className="font-medium text-sm mb-1 truncate">{anime.entry[0].title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 text-xs mr-1"></i>
                      <span className="text-sm text-gray-600">{anime.entry[0].score}</span>
                    </div>
                    {
                      anime.entry[0].genres?.map((genre,i) => <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{genre.name}</span>)
                    }
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    )
};
