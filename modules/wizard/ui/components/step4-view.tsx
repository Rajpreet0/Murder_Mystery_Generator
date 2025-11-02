import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { useWizardStore } from "@/store/useWizardStore"

const StepFour = () => {

  const { difficulty, updateField } = useWizardStore();

  const handleDifficulty = (val: number[]) => {
    updateField("difficulty", val[0]);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-4 sm:px-0">      
      {/* SECTION: DIFFICULTY */}
      <div className="flex flex-col items-start w-full gap-3">
        <div className="w-full">
          <p className="text-lg sm:text-xl font-semibold text-[#EAEAEA]">
            Schwierigkeitsgrad
          </p>
          <p className="text-sm text-[#9C9CA5] max-w-full sm:max-w-[480px] leading-snug mt-1">
            Gib an, wie schwer das Krimi Diner sein soll.  
            Ein Wert von 1 steht für ein leichtes Spiel, 5 für einen schweres Spiel.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <Slider
            max={5}
            step={1}
            defaultValue={[difficulty]}
            onValueChange={handleDifficulty}
            className={cn("w-full sm:w-[60%]")}
          />
          <span className="text-[#D4AF37] text-sm mt-2 sm:mt-0">
            {difficulty} / 5
          </span>
        </div>
      </div></div>
  )
}

export default StepFour