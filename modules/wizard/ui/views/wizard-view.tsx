"use client";
import TooltipAbstract from "@/components/TooltipAbstract";
import { Button } from "@/components/ui/button"
import { useWizardStore } from "@/store/useWizardStore";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import StepOne from "../components/step1-view";
import StepTwo from "../components/step2-view";
import StepThree from "../components/step3-view";
import StepFour from "../components/step4-view";

const WizardView = () => {
    const { step, nextStep, prevStep, reset } = useWizardStore();

  return (
    <div className=" flex flex-col items-center justify-center relative p-2 w-full h-[90vh]">
    {/* WIZARD CONTENT */}
    <div className="flex flex-col items-center justify-center text-white">
        {step === 1 && <StepOne/>}
        {step === 2 && <StepTwo/>}
        {step === 3 && <StepThree/>}
        {step === 4 && <StepFour/>}
    </div>

    {/* STEP BUTTON & RESET BUTTON */}
    <div className="absolute bottom-6 left-0 w-full flex justify-center items-center">
        {/* STEP BUTTON */}
        <div className="flex gap-2">
            <TooltipAbstract tooltipText="Back">
                <Button 
                    onClick={prevStep}
                    disabled={step === 1}
                    className="cursor-pointer bg-violett" ><ChevronLeft/></Button>
            </TooltipAbstract>
            <TooltipAbstract tooltipText="Next">
                <Button
                    onClick={nextStep}
                    disabled={step === 4}
                    className="cursor-pointer bg-violett"><ChevronRight /></Button>
            </TooltipAbstract>
        </div>
        
        {/* RESET BUTTON */}
        <TooltipAbstract tooltipText="Reset">
            <button className="absolute right-4 p-2 bg-lightBlack rounded-md cursor-pointer">
                <RotateCcw 
                    onClick={reset}
                    size={16} className="text-white"/>
            </button>
        </TooltipAbstract>
    </div>
    </div>
  )
}

export default WizardView;