import Image from "next/image";
import Logo from "@/public/logo/logo.svg";

export default function loading() {
    return (
        <div className="flex h-screen flex-col w-full items-center justify-center overflow-hidden"><Image src={Logo} width={500} height={500} alt="search" className="w-[10svw] h-auto rounded-full" /></div>
    )
};
