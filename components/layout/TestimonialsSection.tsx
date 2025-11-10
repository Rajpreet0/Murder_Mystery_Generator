import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

const TestimonialsSection = () => {
  return (
    <motion.section
        className="relative z-10 w-full max-w-6xl px-6 py-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#D4AF37]">
            Was Spieler sagen 💬
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
            {[
            { name: "Sophie & Freunde", text: "Wir hatten einen unvergesslichen Abend – die Story war genial!" },
            { name: "Jonas M.", text: "Das Dinner war perfekt für unseren Geburtstag. Mega einfach zu erstellen!" },
            { name: "Lena K.", text: "Die Rollen waren so lustig! Werde das definitiv nochmal machen." },
            ].map((t, i) => (
                <Card key={i} className="bg-[#141416] border border-[#2C2C2C] p-6 rounded-2xl">
                    <CardContent>
                        <p className="text-[#EAEAEA] text-sm italic mb-3">“{t.text}”</p>
                        <p className="text-[#D4AF37] font-semibold">{t.name}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </motion.section>
  )
}

export default TestimonialsSection
