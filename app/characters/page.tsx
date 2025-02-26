"use client";

import Glide from '@glidejs/glide';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import "@glidejs/glide/dist/css/glide.core.min.css";
import Image from 'next/image'
import Link from 'next/link';
import {
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'


export default function CharactersPage() {
    
    const [characters, setCharacters] = useState([]);

    type charType = {
        id: string,
        name: string,
        image: string
    }
    const sliderConfiguration= {
        gap: 20,
        perView: 1,
        startAt: 0,
        type: "slider" as 'slider'
      };

    const slider = new Glide('.glide', sliderConfiguration);

    const getCharacters = async () => {
        const characters = await fetch('https://dragonball-api.com/api/characters', { cache: 'force-cache' }).then(res => res.json());
        if (characters) return characters
    }
    useEffect(() => {
        slider.mount();
        // // cleanup
        // return () => {
        //     slider.destroy();
        // };
    }, [slider])

    // get characters
    useEffect(() => {
        getCharacters().then(data => setCharacters(data.items));
    }, [])
    
    return (
        <div className="min-h-screen bg-gray-50 text-black" style={{ background: 'rgb(2,0,36)', backgroundImage: 'linear-gradient(90deg, rgba(22,30,46,1) 0%, rgba(139,92,246,1) 35%, rgba(0,212,255,1) 100%)' }}>
            <div className="flex flex-col items-center justify-between h-full">
                <div className='glide'>
                    <div className='glide__track' data-glide-el='track'>
                    <ul className='glide__slides'>
                        {
                            characters?.map((character: charType) => 
                                <li key={character.id} className='glide__slide slider'>
                                    <div className="flex flex-col items-center justify-around min-h-[90svh]">
                                    <h1 className="font-extrabold text-white text-2xl mb-4 text-center">{ character.name }</h1>
                                        <Image className="max-w-full h-[400px] px-4 object-center object-contain active:scale-110 transform transition-transform duration-200" src={character.image} width={500} height={500} alt={character.name} />
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    </div>

                    <div className='absolute top-1/2 w-full glide__arrows flex items-center justify-between gap-4' data-glide-el='controls'>
                        <ChevronLeft className="w-5 h-5 glide__arrow glide__arrow--prev mx-1 text-primary" data-glide-dir='<'/>
                        <ChevronRight className="w-5 h-5 glide__arrow glide__arrow--next mx-1 text-primary" data-glide-dir='>' />
                    </div>

                </div> 

                <div className="flex space-x-4">
                    <Link href="anime/30694" className="flex-1 text-center px-4 py-3 bg-white text-primary active:bg-primary active:text-white font-medium !rounded-button transition-colors">
                        <Info className="w-5 h-5 inline mr-2" />
                        Anime Info
                    </Link>
                    <button className="w-12 h-12 bg-primary flex items-center justify-center !rounded-button">
                    <WhatsappShareButton
                        url={'https://aniverse-kappa.vercel.app/characters'}
                        title={'Explore The Characters in AniVerse'}
                        separator=": "
                        >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    </button>
                </div>
            </div>
        </div>
    )
};
