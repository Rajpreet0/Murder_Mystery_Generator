import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CTASection = () => {
    const router = useRouter();
  return (
    <motion.section
        className="relative z-10 text-center px-6 py-32 w-full overflow-hidden bg-[#0E0E10]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
    >


    <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">
        Bereit für dein erstes Krimi-Dinner?
        </h2>
        <p className="text-[#B3B3B3] mb-8">
        Starte jetzt kostenlos oder hol dir Premium für alle Features.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
            onClick={() => router.push("/wizard")}
            className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white text-lg px-8 py-5"
        >
            Kostenlos starten
        </Button>
        <Button
            className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white text-lg px-8 py-5"
        >
            Upgrade zu Premium
        </Button>
        </div>
    </div>
    </motion.section>
  )
}

export default CTASection
