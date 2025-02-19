import { Search, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from '@/public/logo/logo.svg';

export default function Header() {

    return (
      <nav className="bg-white w-full shadow-sm z-50">
      <div className="flex items-center justify-between px-4 h-14">
        
        <Link href="/" className="text-xl inline-flex items-center justify-center font-bold text-primary">
          <Image src={Logo} width={500} height={500} alt="Logo" className="w-10 h-auto rounded-full active:scale-105 transform transition-transform" />
          {/* AniVerse */}
        </Link>
        
        <div className="relative flex items-center justify-center gap-x-2 ">
            <Link href="/search" className="px-3 py-2 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
              <Search className="w-5 h-5 text-gray-400" />
            </Link>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <User2Icon className="w-5 h-5 text-primary active:scale-105 transform transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
    )
};
