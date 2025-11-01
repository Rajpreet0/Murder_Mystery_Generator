"use client"
import Image from "next/image";
import Logo from "../public/logo.png";
import { useRouter } from "next/navigation";


const Header = () => {

  const router = useRouter();
  return (
    <div className="w-full p-6">
        <Image
            onClick={() => router.push("/")}
            className="cursor-pointer"
            width={100}
            height={100}
            alt="MMD Logo"
            src={Logo}
        />
    </div>
  )
}

export default Header