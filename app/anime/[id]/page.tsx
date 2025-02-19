"use client"
import { animeType } from "@/types/animeType";
import { Bookmark, PlayCircle, Video } from "lucide-react";
import Image from "next/image"
import { use } from 'react';
import { useEffect, useState } from "react";
import Logo from "@/public/logo/logo.svg";


type Params = Promise<{ id: string }>

export default function AnimePage({ params }: { params: Params}) {

    const { id } = use(params);
    const [selectedAnime, setSelectedAnime] = useState<animeType | null>();

    const getAnimeDetails = async () => {
        const animedetails = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { cache: "force-cache" }).then(res => res.json());
        if (animedetails.data) setSelectedAnime(animedetails.data)
    }

    useEffect(() => {
        getAnimeDetails();
    })

    return (
        <div className="bg-white z-50 flex items-end text-black">
            {
                selectedAnime ?

            <div className="bg-white w-full h-[90vh] rounded-t-2xl overflow-y-auto">
            <div className="relative">
                <Image
                width={500}
                height={500}
                src={selectedAnime?.images.jpg.large_image_url}
                alt={selectedAnime?.title}
                className="w-full h-[50svh] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-xl font-bold text-white mb-2">{selectedAnime?.title}</h2>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                    <span className="text-white">{selectedAnime?.rating}</span>
                    </div>
                    <span className="text-white">•</span>
                    <span className="text-white">{selectedAnime?.genre}</span>
                </div>
                </div>
            </div>
            
            <div className="p-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Episodes</div>
                    <div className="font-medium">{selectedAnime?.episodes}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium">{selectedAnime?.status}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Release Date</div>
                    <div className="font-medium">{selectedAnime?.aired.from.toString().split('T')[0]}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">{selectedAnime?.duration}</div>
                </div>
                </div>

                <div>
                <h3 className="text-lg font-bold mb-2">Synopsis</h3>
                <p className="text-gray-600 leading-relaxed text-ellipsis">{selectedAnime?.synopsis}</p>
                </div>

                <div>
                <h3 className="text-lg font-bold mb-2">Studio</h3>
                <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-primary" />
                    {
                        selectedAnime?.studios?.map((studio) => 
                            <span key={studio.name}>{studio.name}</span>
                        )
                    }
                </div>
                </div>

                <div className="flex space-x-4">
                <button onClick={()=> alert('Feature upcoming...')} className="flex-1 px-4 py-3 bg-primary text-white font-medium !rounded-button">
                    <PlayCircle className="w-5 h-5 inline mr-2" />
                    Watch Now
                </button>
                <button className="w-12 h-12 bg-gray-100 flex items-center justify-center !rounded-button">
                    <Bookmark className="w-5 h-5 text-gray-700" />
                </button>
                </div>
            </div>
            </div>
                :
                <div className="flex h-screen flex-col w-full items-center justify-center overflow-hidden"><Image src={Logo} width={500} height={500} alt="search" className="w-[10svw] h-auto rounded-full" /></div>
            }
            
        </div>
    )
};
