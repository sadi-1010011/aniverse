"use client";
import Header from "@/components/Header/Header";
import { animeType } from "@/types/animeType";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SearchPage() {

    const fallbackImage = "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684327.jpg?semt=ais_hybrid";

    const [notfound, setNotfound] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<animeType[]|null>([]);

    const getSearchAnime = async() => {
        if (!searchQuery) { alert('enter anime name to search!'); return }
        const anime = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`, { cache: "force-cache" }).then(res => res.json());
        if (anime.data.length) { setSearchResult(anime.data.slice(0,6)); }
            else {
                setSearchResult(null);
                setNotfound(true)
            }
    }

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        getSearchAnime()
    }

    return (
    <div className="min-h-screen bg-gray-50 text-black">
        <Header />
        
        {/* Search Bar */}
        <div className="p-4 mt-14">
            <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white shadow-sm border-none text-sm"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-5 h-5 inline-block absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
        </div>

        { searchResult?.length ?
        <div className="grid grid-cols-2 gap-4 px-4 mt-2 mb-8">
             {searchResult?.map((anime: animeType, i: number) => (
                <Link href={`/anime/${anime.mal_id}`} key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative">
                        <Image
                            width={500}
                            height={500}
                            src={anime.images.jpg.image_url || fallbackImage} 
                            alt={anime.title}
                            className="w-full h-32 object-cover"
                        />
                    </div>

                    <div className="p-3">
                        <h4 className="font-medium text-sm mb-1 truncate">{anime.title}</h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            <i className="fa-solid fa-star text-yellow-400 text-xs mr-1"></i>
                            <span className="text-sm text-gray-600">{anime.rating}</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{anime.genre}</span>
                        </div>
                    </div>
                </Link>
            ))}
          </div>
            :
            !notfound && <h2 className="text-center my-2 text-gray-500 ">Find your favorite anime!</h2> }
            {searchQuery && notfound && <h2 className="text-center my-2 text-gray-500 ">Could&apos;nt find {searchQuery}!</h2>}
    </div>
    )
};
