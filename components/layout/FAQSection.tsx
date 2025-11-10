import { motion } from "framer-motion";

const FAQSection = () => {
  return (
    <motion.section
        className="relative z-10 w-full max-w-4xl px-6 py-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <h2 className="text-3xl font-bold text-center mb-12 text-[#D4AF37]">FAQ ❓</h2>
        <div className="space-y-6">
            {[
            { q: "Wie funktioniert die Bezahlung?", a: "Die Zahlung erfolgt einmalig. Kein Abo, keine wiederkehrenden Kosten." },
            { q: "Wie lange dauert die Generierung?", a: "In der Regel nur wenige Sekunden – Premium liefert dir zusätzlich tiefere Storys." },
            { q: "Kann ich es mit Freunden teilen?", a: "Ja, mit Premium kannst du das Dinner teilen und per E-Mail verschicken." },
            ].map((faq, i) => (
            <div key={i} className="border border-[#2C2C2C] rounded-xl p-4 bg-[#141416]">
                <h3 className="text-[#EAEAEA] font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#9C9CA5] text-sm">{faq.a}</p>
            </div>
            ))}
        </div>
    </motion.section>
  )
}

export default FAQSection
