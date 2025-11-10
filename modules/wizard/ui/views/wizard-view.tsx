"use client";
import TooltipAbstract from "@/components/layout/TooltipAbstract";
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/useWizardStore";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import StepOne from "../components/step1-view";
import StepTwo from "../components/step2-view";
import StepThree from "../components/step3-view";
import StepFour from "../components/step4-view";
import SummaryView from "../components/stepSummary-view";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const WizardView = () => {
    const { step, nextStep, prevStep, reset, players, setting, genre, tone } = useWizardStore();
    const totalSteps = 5;
    const progress = (step / totalSteps) * 100;

    const handleNextStep = () => {

        // Check vor Number of Players and Validate Email
        if (step === 1) {
          if (players.length < 4 ) {
            toast.error("Mindestens 4 Spieler erforderlich 👥");
            return;
          }
          const invalid = players.some((p) => 
            !p.name.trim() || !p.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)
          );
          if (invalid) {
            toast.error("Bitte gültige Namen und E-Mails eingeben 📧");
            return;
          }
        }

        // Check if Dropdown Items are selected
        if (step === 2) {
          if (!setting || !genre || !tone) {
            toast.error("Bitte alle Dropdowns auswählen 🎭");
            return;
          }
        }


        nextStep();
    }

  return (
    <div className="w-full text-white flex flex-col min-h-screen bg-[#0E0E10]">
      {/* HEADER */}
      <header className="text-center ">
        <div className="w-full bg-[#1B1C22] h-2  overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-[#8E7CC3] to-[#D4AF37]  shadow-[0_0_12px_#8E7CC3aa]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <h2 className="text-3xl font-semibold text-textMain mb-2 py-6">
          {step === 1 && "🥸 Teilnehmer hinzufügen"}
          {step === 2 && "🎭 Setting & Stimmung wählen"}
          {step === 3 && "🍽️ Menü & Dauer wählen"}
          {step === 4 && "🚨 Schwierigkeitsgrad wählen"}
          {step === 5 && "🕵️‍♂️ Deine Zusammenfassung"}
        </h2>


      </header>

      {/* CONTENT (zentriert & flexibel) */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32 sm:pb-40 overflow-y-auto relative">
        <AnimatePresence mode="wait">
            <motion.div
              key={step} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex justify-center"
            >
              {step === 1 && <StepOne />}
              {step === 2 && <StepTwo />}
              {step === 3 && <StepThree />}
              {step === 4 && <StepFour />}
              {step === 5 && <SummaryView />}
            </motion.div>
        </AnimatePresence>
      </main>

      {/* STICKY FOOTER */}
      <footer className="sticky bottom-0 left-0 w-full flex justify-center items-center bg-[#0E0E10]/85 backdrop-blur-md border-t border-[#2C2C2C] py-4 z-50">
        {/* STEP BUTTONS */}
        <div className="flex gap-3">
          <TooltipAbstract tooltipText="Zurück">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              className="cursor-pointer bg-[#8E7CC3] hover:bg-[#A89FD4] text-white"
            >
              <ChevronLeft />
            </Button>
          </TooltipAbstract>

          <TooltipAbstract tooltipText={step === 5 ? "Fertig" : "Weiter"}>
            <Button
              onClick={handleNextStep}
              disabled={step === 5}
              className="cursor-pointer bg-[#8E7CC3] hover:bg-[#A89FD4] text-white"
            >
              <ChevronRight />
            </Button>
          </TooltipAbstract>
        </div>

        {/* RESET BUTTON */}
        <TooltipAbstract tooltipText="Zurücksetzen">
          <button
            onClick={reset}
            className="absolute right-6 p-2 bg-[#1B1C22] rounded-md hover:bg-[#2C2C2C] cursor-pointer transition-colors"
          >
            <RotateCcw size={18} className="text-white" />
          </button>
        </TooltipAbstract>
      </footer>
    </div>
  );
};

export default WizardView;