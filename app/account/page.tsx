"use client"
import Header from "@/components/Header/Header";
import { deleteData, getStoreData, initDB, Stores } from "@/db/db";
import { fallbackCharacter } from "@/lib/fallbackCharacter";
import { userType } from "@/types/userType";
import { Atom, LogOut } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AccountPage() {

    const [user, setUser] = useState<userType|null>(null);

    const deleteAccount = () => {
        const user = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login') as string) : null;
        localStorage.clear();
        initDB();
        console.log(user?.id)
        deleteData(Stores.Users, user?.id as string);
        window?.location.replace('/profile')
    }
    useEffect(() => {        

        const handleGetUser = async () => {
            try {
                await initDB();
                const users = await getStoreData<userType>(Stores.Users);
                setUser(users[0]);
            } catch (err: unknown) {
                if (err instanceof Error) console.log('error reading user from indexDB, ', err)
                setUser(null);
            }
        };

        handleGetUser();

    }, [])

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center text-center">
            <Header />
            <div className="flex flex-col items-center justify-center w-full">

                <h1 className="w-full inline-block font-extrabold text-gray-600 text-2xl text-left my-4 px-4">Profile</h1>

                {/* PROFILE CARD */}
                <div className="container">
                    <div className="row">
                        
                        <div className="flex flex-col items-center w-4/5 mx-auto text-black">
                            <Image priority className="w-3/5 h-auto aspect-square border-gray-300 border p-1.5 rounded-full" width={500} height={500} src={ user?.selectedCharacter?.character as StaticImport || fallbackCharacter } alt="profile" />
                  
                            <h1 className="text-2xl font-bold capitalize text-center pt-2 break-all">{ user?.name || 'user'}</h1>
                            <div className="inline-flex items-center gap-x-0.5 w-11/12 justify-center">
                                <Atom className="h-5 w-5" />
                                <span className="text-sm font-semibold text-center overflow-x-scroll">{ user?.email || 'email' }</span>
                            </div>
                        </div>

                        {/* DATA FIELD */}
                        {/* <div className="text-center mt-4">
                            <h1 className="text-3xl font-bold capitalize pt-2">0</h1>
                            <span className="text-sm font-semibold capitalize text-slate-500">events attended</span>
                        </div> */}

                        {/* SAVED, WAITING */}
                        {/* <div className="flex w-full items-center text-center justify-evenly pt-2">
                            <div>
                                <h1 className="text-xl font-bold text-primary capitalize pt-2">
                                    {
                                        0
                                    }
                                </h1>
                                <span className="text-xs font-semibold capitalize text-slate-500">saved</span>
                            </div>
                            <div className="inline-flex flex-col items-center">
                                <h1 className="inline-flex items-center text-primary justify-center gap-x-1 text-xl font-bold capitalize pt-2">
                                    {
                                        0
                                    }
                                </h1>
                                <span className="text-xs font-semibold capitalize text-slate-500">waiting</span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="absolute bottom-0 container my-6">
                    <div className="col text-center">
                        <button onClick={ deleteAccount } className="inline-flex items-center justify-center px-4 py-2 bg-tertiary text-white font-medium !rounded-button">
                            <LogOut className="w-5 h-5 inline mr-2" />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
