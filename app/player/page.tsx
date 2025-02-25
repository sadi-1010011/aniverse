"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Logo from "@/public/logo/logo.svg";

    
export default function Player() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const url = searchParams.get('data')
    console.log(url);
    return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-primary">
        <Suspense fallback="loading..">
        {
           url ? <iframe className="rounded" src={url} allowFullScreen /> :

        <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="font-extrabold text-white text-2xl mb-4">Video unavailable</h1>
            <Image src={Logo} width={500} height={500} alt="search" className="w-[33svw] h-auto rounded-full mt-6" />
            <button onClick={ ()=> router.back() } className="rounded-button block mx-auto my-2 bg-primary px-6 py-2 text-white active:bg-violet-200 active:text-primary transition-colors capitalize font-bold">back</button>
        </div>
           
        }
        </Suspense>
    </div>
    )
  }