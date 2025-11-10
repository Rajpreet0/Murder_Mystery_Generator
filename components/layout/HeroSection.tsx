import { motion } from "framer-motion"
import Image from "next/image"
import Logo from "@/public/logo.png";
import { DM_Serif_Text } from "next/font/google";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const dm = DM_Serif_Text({
    subsets: ["latin"],
    weight: "400",
})


const HeroSection = () => {
    const router = useRouter();
  return (
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image src={Logo} alt="Logo MMD" width={140} height={140} className="mx-auto mb-4" />
        </motion.div>

        <motion.h1
          className={`${dm.className} text-4xl md:text-5xl font-extrabold text-[#D4AF37]`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Murder Mystery Dinner
        </motion.h1>

        <motion.p
          className="mt-4 max-w-lg text-[#B3B3B3] text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Erstelle dein eigenes Krimi-Dinner 🎭 – mit KI-generierten Rollen, Menü und Story.
          Spiele mit Freunden einen unvergesslichen Abend.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Button
            onClick={() => router.push("/wizard")}
            className="bg-[#8E7CC3] hover:bg-[#A89FD4] cursor-pointer text-white text-lg font-semibold px-8 py-6 rounded-xl flex items-center gap-2 shadow-[0_0_25px_-10px_rgba(142,124,195,0.6)]"
          >
            <Sparkles className="w-5 h-5" /> Spiel starten
          </Button>
        </motion.div>
      </section>
  )
}

export default HeroSection
