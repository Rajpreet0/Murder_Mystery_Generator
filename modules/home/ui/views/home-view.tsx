"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DM_Serif_Text } from "next/font/google";
import FeatureComponent from "../components/featureComponent";

const dm = DM_Serif_Text({
    subsets: ["latin"],
    weight: "400",
})

const HomeView = () => {

    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0,1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
       <main className="min-h-screen w-full bg-[#0E0E10] text-white flex flex-col items-center justify-start relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1d] to-[#0E0E10]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#8E7CC3]/20 rounded-full blur-[180px]" />

      {/* HERO SECTION */}
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

      {/* Scroll-activated Paywall */}
      <motion.section
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-5xl px-6 py-24"
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-[#D4AF37]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Wähle deinen Zugang 🔐
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="bg-[#141416] border border-[#2C2C2C] text-center rounded-2xl p-6 flex flex-col justify-between h-full">
              <CardContent>
                <h3 className="text-2xl font-bold mb-2 text-[#EAEAEA]">Free</h3>
                <p className="text-sm text-[#9C9CA5] mb-6">
                  Teste das Spiel einmal kostenlos und erlebe dein erstes Dinner.
                </p>

                <div className="space-y-2 text-sm text-[#CFCFCF] mb-6">
                  <FeatureComponent isFree={false} text="mini-Ki für schnelle Generierung" />
                  <FeatureComponent isFree={false} text="1x Dinner kostenlos" />
                  <FeatureComponent isFree text="Keine Sharing-Funktion" />
                  <FeatureComponent isFree text="Kein PDF-Export" />
                  <FeatureComponent isFree text="Kein Regenerate" />
                </div>

                <Button
                  onClick={() => router.push("/wizard")}
                  className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white font-medium mt-4 w-full py-5"
                >
                  Kostenlos starten
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="bg-gradient-to-b from-[#1F1B29] to-[#141416] border border-[#8E7CC3]/40 text-center rounded-2xl p-6 shadow-[0_0_30px_-10px_rgba(142,124,195,0.5)] flex flex-col justify-between h-full">
              <CardContent>
                <div className="flex flex-col items-center">
                  <Crown className="text-[#D4AF37] w-8 h-8 mb-2" />
                  <h3 className="text-2xl font-bold text-[#D4AF37]">Premium</h3>
                  <p className="text-sm text-[#B3B3B3] mb-6">Alle Features. Keine Limits.</p>
                </div>

                <div className="space-y-2 text-sm text-[#CFCFCF] mb-6">
                  <FeatureComponent isFree={false} text="MMD KI mit tieferer Storyqualität" />
                  <FeatureComponent isFree={false} text="Dinner teilen & gemeinsam spielen" />
                  <FeatureComponent isFree={false} text="Bis zu 3x neu generieren" />
                  <FeatureComponent isFree={false} text="PDF-Export & E-Mail Versand" />
                </div>

                <div className="mt-4 bg-[#8E7CC3]/20 border border-[#8E7CC3]/30 rounded-xl py-3 mb-4">
                  <p className="text-3xl font-bold text-[#D4AF37]">2,99 €</p>
                  <p className="text-xs text-[#A7A7A7]">Vollständiges Spiel</p>
                </div>

                <Button
                  onClick={() => router.push("/wizard")}
                  className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white font-semibold w-full py-5"
                >
                  Upgrade starten
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 pb-6 text-xs text-[#6D6D6D] tracking-wide text-center">
        © {new Date().getFullYear()} Murder Mystery Dinner
      </footer>
    </main>
  )
}

export default HomeView