import { HeartHandshakeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from '@/public/logo/logo.svg';

export default function Footer() {
    return (
        <div className="absolute bottom-0 right-0 left-0 w-full flex items-center justify-center py-2 text-neutral-500 text-xs text-bold"><Image src={Logo} width={100} height={100} className="w-5 h-5 rounded-full" alt="Anivese" /> All rights not reserved <Link href="https://www.instagram.com/sadiqt_/" className="inline-flex items-center justify-center text-primary">&nbsp;Sadiq <HeartHandshakeIcon className="w-4 h-4 inline" /></Link></div>
    )
};
