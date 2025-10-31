"use client"
import Image from "next/image";
import Logo from "../public/logo.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  
  const router = useRouter();

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center">
      <Image
        width={150}
        height={150}
        alt="Logo MMD"
        src={Logo}
        className="mt-2"
      />
      <div className="h-[80vh] flex items-center">
        <Button
          onClick={() => router.push("/wizard")}
          className="bg-violett text-xl p-6 text-white font-semibold tracking-wider cursor-pointer"
        > 
          Start Game
        </Button>
      </div>
    </div>
  );
}
