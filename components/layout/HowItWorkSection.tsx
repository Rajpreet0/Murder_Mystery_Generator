import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

const HowItWorkSection = () => {
  return (
    <motion.section
        className="relative z-10 w-full max-w-6xl px-6 py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#D4AF37]">
            So funktionierts 
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                { step: "1", title: "Infos eingeben", text: "Wähle Setting, Teilnehmer und Stimmung – der Rest passiert automatisch." },
                { step: "2", title: "Dinner generieren", text: "Unsere KI erstellt dein individuelles Krimi-Dinner in wenigen Sekunden." },
                { step: "3", title: "Spielen & genießen", text: "Lade Freunde ein, teile Rollen oder exportiere alles als PDF." },
            ].map(({ step, title, text }) => (
                <Card key={step} className="bg-[#141416] border border-[#2C2C2C] text-center p-6 rounded-2xl">
                    <CardContent>
                        <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#8E7CC3]/30 text-[#D4AF37] flex items-center justify-center font-bold text-lg">{step}</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                        <p className="text-sm text-[#A7A7A7]">{text}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </motion.section>
  )
}

export default HowItWorkSection
