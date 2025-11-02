"use client";
import TooltipAbstract from "@/components/TooltipAbstract";
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/useWizardStore";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import StepOne from "../components/step1-view";
import StepTwo from "../components/step2-view";
import StepThree from "../components/step3-view";
import StepFour from "../components/step4-view";
import SummaryView from "../components/stepSummary-view";

const WizardView = () => {
    const { step, nextStep, prevStep, reset } = useWizardStore();

  return (
    <div className="w-full text-white flex flex-col min-h-screen bg-[#0E0E10]">
      {/* HEADER */}
      <header className="text-center py-6">
        <h2 className="text-3xl font-semibold text-textMain mb-2">
          {step === 1 && "🥸 Teilnehmer hinzufügen"}
          {step === 2 && "🎭 Setting & Stimmung wählen"}
          {step === 3 && "🍽️ Menü & Dauer wählen"}
          {step === 4 && "🚨 Schwierigkeitsgrad wählen"}
          {step === 5 && "🕵️‍♂️ Deine Zusammenfassung"}
        </h2>
      </header>

      {/* CONTENT (zentriert & flexibel) */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32 sm:pb-40 overflow-y-auto">
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
        {step === 5 && <SummaryView />}
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
              onClick={nextStep}
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