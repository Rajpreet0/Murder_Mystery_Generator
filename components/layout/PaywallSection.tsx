"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Crown } from "lucide-react";
import FeatureComponent from "@/modules/home/ui/components/featureComponent";


const PaywallSection = () => {
    const router = useRouter();


  return (
    <section className="relative z-10 w-full max-w-5xl px-6 pb-24">
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
                <FeatureComponent isFree={false} text="GPT-4o-mini für schnelle Generierung" />
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
                <FeatureComponent isFree={false} text="GPT-5 mit tieferer Storyqualität" />
                <FeatureComponent isFree={false} text="Dinner teilen & gemeinsam spielen" />
                <FeatureComponent isFree={false} text="Bis zu 3x neu generieren" />
                <FeatureComponent isFree={false} text="PDF-Export & E-Mail Versand" />
                <FeatureComponent isFree={false} text="Einmalige Zahlung – kein Abo!" />
              </div>

              <div className="mt-4 bg-[#8E7CC3]/20 border border-[#8E7CC3]/30 rounded-xl py-3 mb-4">
                <p className="text-3xl font-bold text-[#D4AF37]">4,99 €</p>
                <p className="text-xs text-[#A7A7A7]">Lebenslanger Zugang</p>
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
    </section>
  )
}

export default PaywallSection