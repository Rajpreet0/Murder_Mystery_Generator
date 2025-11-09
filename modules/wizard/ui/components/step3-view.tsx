"use state";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useWizardStore } from "@/store/useWizardStore"
import { useState } from "react"

const StepThree = () => {

  const { courses, duration, updateField } = useWizardStore(); 
  const [menuTheme, setMenuTheme] = useState("");

  const handleCourseChange = (val: string) => {
    updateField("courses", Number(val));
  };

  const handleDurationChange = (val: number[]) => {
    updateField("duration", val[0]);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-4 sm:px-0">
      {/* SECTION: COURSES */}
      <div className="flex flex-col items-start w-full gap-3">
        <div className="w-full">
          <p className="text-lg sm:text-xl font-semibold text-[#EAEAEA]">
            Anzahl der Gänge
          </p>
          <p className="text-sm text-[#9C9CA5] max-w-full sm:max-w-[480px] leading-snug mt-1">
            Wähle, wie viele Gänge dein Dinner-Menü haben soll.  
            Typischerweise sind 3 Gänge klassisch, 4–5 Gänge für besondere Anlässe.
          </p>
        </div>

        <RadioGroup
          defaultValue={courses.toString()}
          onValueChange={handleCourseChange}
          className="flex gap-6 mt-2"
        >
          {[3, 4, 5].map((val) => (
            <div
              key={val}
              className="flex items-center gap-2 text-[#EAEAEA]"
            >
              <RadioGroupItem
                value={val.toString()}
                id={`course-${val}`}
                className="border-[#8E7CC3] text-[#D4AF37] focus:ring-[#8E7CC3]"
              />
              <Label
                htmlFor={`course-${val}`}
                className="cursor-pointer text-base hover:text-[#D4AF37] transition-colors"
              >
                {val}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* SECTION: DURATION */}
      <div className="flex flex-col items-start w-full gap-3">
        <div className="w-full">
          <p className="text-lg sm:text-xl font-semibold text-[#EAEAEA]">
            Geschätzte Dauer
          </p>
          <p className="text-sm text-[#9C9CA5] max-w-full sm:max-w-[480px] leading-snug mt-1">
            Gib an, wie lange das Dinner inklusive Spiel dauern soll.  
            Ein Wert von 1 steht für ein kurzes Abend-Event, 5 für einen kompletten Abend.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
          <Slider
            max={5}
            step={1}
            defaultValue={[duration]}
            onValueChange={handleDurationChange}
            className={cn("w-full sm:w-[60%]")}
          />
          <span className="text-[#D4AF37] text-sm mt-2 sm:mt-0">
            {duration} / 5
          </span>
        </div>
      </div>

      {/* SECTION: MENU THEME */}
      <div className="flex flex-col items-start w-full gap-3">
        <div className="w-full">
          <p className="text-lg sm:text-xl font-semibold text-[#EAEAEA]">
            Menüthema
          </p>
          <p className="text-sm text-[#9C9CA5] max-w-full sm:max-w-[480px] leading-snug mt-1">
            Das Menüthema verleiht dem Abend seine persönliche Note.  
            Beispiele: <span className="text-[#D4AF37]">&quot;Italienischer Abend&quot;</span>,  
            <span className="text-[#D4AF37]">&quot;Mord im Schloss Bellevue&quot;</span> oder  
            <span className="text-[#D4AF37]">&quot;Dinner im All&quot;</span>.
          </p>
        </div>

        <Input
          type="text"
          placeholder="z. B. 'Italienischer Abend'"
          value={menuTheme}
          onChange={(e) => setMenuTheme(e.target.value)}
          className="w-full sm:w-[420px] bg-[#1B1C22] border border-[#2C2C2C] text-[#EAEAEA] placeholder-[#6B6B6B] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8E7CC3]"
        />
      </div>
    </div>
  )
}

export default StepThree