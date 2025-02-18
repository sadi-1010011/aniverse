"use client";
import { fallbackImage } from "@/lib/fallbackimage";
import { animeType } from "@/types/animeType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewReleases() {
    
    const router = useRouter();
    const [newreleaseAnime, setNewReleaseAnime] = useState<animeType[]>([]);
    
    // Fetch Recommded
    const getNewReleaseAnime = async () => {
        const anime = await fetch('https://api.jikan.moe/v4/schedules?page=1').then(res => res.json());
        if (anime.data) setNewReleaseAnime(anime.data.slice(0,4));
    }

    useEffect(() => {
            getNewReleaseAnime()
    }, [])
    
    return (
        <div className="pb-16">
        {/* Recommended Section */}
        <div className="px-4">
          <h3 className="text-lg font-bold mb-4">New Episodes</h3>
          <div className="grid grid-cols-2 gap-4">
            { newreleaseAnime.length > 0 && newreleaseAnime.map((anime: animeType, i: number) => (
              <div onClick={()=> router.push(`/anime/${String(anime.mal_id).split('-')[0]}`)} key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <Image
                    width={500}
                    height={500}
                    src={anime.images.jpg.image_url || fallbackImage} 
                    alt={anime.title || 'anime poster'}
                    className="w-full h-32 object-cover"
                  />
                </div>

                <div className="p-3">
                  <h4 className="font-medium text-sm mb-1 truncate">{anime.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 text-xs mr-1"></i>
                      <span className="text-sm text-gray-600">{anime.score}</span>
                    </div>
                    {
                      anime.genres.map((genre,i) => <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full">{genre.name}</span>)
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
