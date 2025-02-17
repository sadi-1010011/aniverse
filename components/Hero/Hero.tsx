"use client";

import { genres } from "@/data/genre";
import { animeType } from "@/types/animeType";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Hero() {

    const fallbackImage = "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684327.jpg?semt=ais_hybrid";

    const router = useRouter();
    const [recommendedAnime, setRecommendedAnime] = useState<animeType[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [status, setStatus] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    // const [yearRange, setYearRange] = useState([2000, 2025]);
    // const [ratingRange, setRatingRange] = useState([0, 5]);

    // Fetch Recommded
    const getRecommendedAnime = async () => {
        const anime = await fetch('https://api.jikan.moe/v4/recommendations/anime').then(res => res.json());
        if (anime) setRecommendedAnime(anime.data.slice(0,4));
    }

    useEffect(() => {
        getRecommendedAnime()
    }, [])

    const toggleGenre = (genreName: string) => {
        setSelectedGenres(prev => 
          prev.includes(genreName) 
            ? prev.filter(g => g !== genreName)
            : [...prev, genreName]
        );
        return null
    };

    return (
        <div className="pb-16">

        {/* Genre Filters */}
        <div className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-scroll pb-2 scrollbar-hide">
            {genres.map(genre => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.name)}
                className={`flex items-center px-4 py-2 !rounded-button whitespace-nowrap ${
                  selectedGenres.includes(genre.name)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                <i className={`${genre.icon} mr-2`}></i>
                {genre.name}
              </button>
            ))}
          </div>
        </div>

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
                      <span className="text-sm text-gray-600">{anime.entry[0].rating}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{anime.entry[0].genre}</span>
                  </div>
                </div>

                {/* --- */}
                {/* <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1">{anime.entry[0].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
                      {anime.genre}
                    </span>
                    <div className="flex items-center">
                      <i className="fa-solid fa-star text-yellow-400 text-xs mr-1"></i>
                      <span className="text-sm">{anime.rating}</span>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Filter button */}
        <button
        onClick={() => setShowFilters(true)}
        className="fixed right-4 bottom-20 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <SlidersHorizontal className="w-5 h-5"/>
      </button>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <div className="flex gap-2">
                  {['All', 'Ongoing', 'Completed'].map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s.toLowerCase())}
                      className={`px-4 py-2 !rounded-button ${
                        status === s.toLowerCase()
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Sort By</h4>
                <div className="flex gap-2">
                  {['Popular', 'New', 'Rating'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s.toLowerCase())}
                      className={`px-4 py-2 !rounded-button ${
                        sortBy === s.toLowerCase()
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-indigo-600 text-white !rounded-button"
              >
                Feature Upcoming...
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    )
};
