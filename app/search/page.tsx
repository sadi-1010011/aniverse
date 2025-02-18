"use client";
import Header from "@/components/Header/Header";
import { genres } from "@/data/genre";
import { SlidersHorizontal, X } from "lucide-react";
import { animeType } from "@/types/animeType";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { useEffect, useState } from "react";

export default function SearchPage() {

    const fallbackImage = "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684327.jpg?semt=ais_hybrid";

    const [notfound, setNotfound] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<animeType[]|null>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [status, setStatus] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    // const [yearRange, setYearRange] = useState([2000, 2025]);
    // const [ratingRange, setRatingRange] = useState([0, 5]);


    const getSearchAnime = async() => {
        if (!searchQuery) { setSearchResult(null); return }
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

    const toggleGenre = (genreName: string) => {
        console.log(genreName)
        setSelectedGenres(prev => 
          prev.includes(genreName) 
            ? prev.filter(g => g !== genreName)
            : [...prev, genreName]
        );
        return null
    };

    const applyFilters = () => {
        let filteredResult;
        switch (status) {
            case 'all' :
                filteredResult = searchResult?.filter(anime => 
                    anime.airing === true || anime.airing === false
                ); break;
            case 'ongoing' :
                filteredResult = searchResult?.filter(anime => 
                    anime.airing === true
                ); break;
            case 'completed' :
                filteredResult = searchResult?.filter(anime => 
                    anime.airing === false
                ); break;
            default:
                filteredResult = searchResult?.filter(anime => 
                    anime.airing === true || anime.airing === false
                );
        }

        if (filteredResult) {
            switch (sortBy) {
                case 'popularity':
                    filteredResult.sort((a, b) => b.popularity - a.popularity);
                    break;
                case 'rating':
                    filteredResult.sort((a, b) => b.rating - a.rating);
                    break;
                case 'new':
                    filteredResult.sort((a, b) => new Date(b.aired.from || 0).getTime() - new Date(a.aired.from || 0).getTime());
                    break;
                default:
                    break;
            }
        }
    
        setSearchResult(filteredResult || null)
        setShowFilters(false)
    }

    // Genre select
    useEffect(()=> {
        const sortedgenre = searchResult?.filter(anime => 
            selectedGenres.every(selectedGenre => 
            anime.genres.some(genre => genre.name.toLowerCase() === selectedGenre.toLowerCase())
            )
        );
        setSearchResult(sortedgenre || null);
    }, [selectedGenres])

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
                onChange={(e) => { setSearchQuery(e.target.value); getSearchAnime() }}
            />
            <Search className="w-5 h-5 inline-block absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>
        </div>

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
                {/* <i className={`${g  enre.icon} mr-2`}></i> */}
                {genre.name}
              </button>
            ))}
          </div>
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
            !notfound && <div className="flex flex-col items-center justify-center"><Image src={Logo} width={500} height={500} alt="search" className="w-[50svw] h-auto rounded-full" /></div> }
            {searchQuery && notfound && <h2 className="text-center my-2 text-gray-500 ">Could&apos;nt find {searchQuery}!</h2>}
        
        {/* Filter button */}
        <button onClick={() => setShowFilters(true)} className="fixed right-4 bottom-20 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5"/>
        </button>

        {/* Filter Modal */}
        {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="text-violet-600 w-5 h-5" />
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
                onClick={() => applyFilters()}
                className="w-full py-3 bg-indigo-600 text-white !rounded-button"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
        
    </div>
    )
};
