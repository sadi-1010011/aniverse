"use client";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { Plus } from "lucide-react";
import { characters } from "@/data/characters";
import { useEffect, useState } from "react";
import { characterType } from "@/types/characterType";
import { addData, initDB, Stores } from "@/db/db";
import { userType } from "@/types/userType";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {

    const router = useRouter();
    const [showAllCharacters, setShowAllCharacters] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<characterType|null>(null);


    // User already login?
    useEffect(() => {
        const user = localStorage.getItem('login');
        if (user) router.replace('/account');
    })

    function handleCreateProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') || "";
        const name = formData.get('name') || "User";

        // if (!email || !name) alert('Name and Email are required!')
        if (name === '' && email === '') {
            alert('Please enter a valid name and email');
            return;
          }
        // create User with form data

        const user = {
            id: Date.now(),
            email: String(email),
            name: String(name),
            selectedCharacter: selectedCharacter
        }

        // create user in indexDB!
        async function createUser(data: userType) {
            try {
                await initDB();
                const res = await addData(Stores.Users, data );
                if (res) {
                    // store login in localstorage
                    localStorage.setItem("login", JSON.stringify(data));
                    // goto profile
                    router.push('/account');
                }
            } catch (err: unknown) {
                if (err instanceof Error) console.log('error while creating user profile ', err.message)
            }
        };

        // Save User!
        createUser(user);

    }


    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col items-center text-center">
            <Header />
            <div className="flex flex-col items-center justify-center w-full h-full">

                <h1 className="font-extrabold text-gray-600 text-2xl mb-4">Create Profile</h1>
                <div className="container">
                    <div className="row w-4/5 mx-auto">
                        {
                            characters.slice(0, showAllCharacters? undefined: 5).map(character => <Image onClick={()=> setSelectedCharacter(character)} key={character.value} src={character.character} width={500} height={500} alt={character.value} className={`${showAllCharacters ? 'scale-150 m-2.5' : 'scale-100' } ${ selectedCharacter === character ? `ring-2 ring-primary ${ !showAllCharacters? 'scale-110' : 'scale-[1.65]'} z-99 relative ` : 'z-0' } w-8 h-8 inline-block rounded-full active:ring-2 active:ring-primary object-fill box-content transition-transform duration-300`} />)
                        }
                    </div>
                    <Link href="/characters" className="inline-flex items-center justify-center text-primary text-xs font-semibold capitalize my-2">Explore Character&apos;s</Link>
                    <div className="row my-2">
                        <Plus onClick={()=> setShowAllCharacters(!showAllCharacters)} className="w-5 h-5 inline rounded bg-violet-200 p-1 text-white box-content hover:bg-violet-300 active:bg-primary active:text-white transition-colors font-bold" />
                    </div>
                </div>
                <form onSubmit={(e)=>handleCreateProfile(e)} method="post">
                    <input required className="w-3/4 py-2 px-4 rounded-button bg-white text-black my-1 focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Email" name="email" />
                    <input required className="w-3/4 py-2 px-4 rounded-button bg-white text-black my-1 focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Name" name="name" />
                    <button type="submit" className="rounded-button block mx-auto my-2 bg-violet-200 px-6 py-2 text-primary hover:bg-violet-300 active:bg-primary active:text-white transition-colors font-bold">Save</button>
                </form>
            </div>
        </div>
    )
};
