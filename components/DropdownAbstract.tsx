import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface DropdownAbstractProps {
    triggerText: string;
    options: DropdownOption[];
    label?: string;
    description?: string;
    selected?: string;
    onSelect: (value: string) => void;
}

const DropdownAbstract: React.FC<DropdownAbstractProps> = ({triggerText, options, label, description, selected, onSelect}) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start w-full gap-2 px-2 sm:px-0">
      {/* Label + Description */}
      {label && (
        <div className="w-full">
          <p className="text-base sm:text-lg font-semibold text-[#EAEAEA] mb-1">
            {label}
          </p>
          {description && (
            <p className="text-sm text-[#9C9CA5] mb-2 max-w-full sm:max-w-[420px] leading-snug">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Dropdown */}
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={clsx(
              "w-full sm:w-[420px] justify-between rounded-lg sm:rounded-xl font-medium cursor-pointer transition-all",
              "px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg",
              "bg-[#141416] text-[#EAEAEA] border border-[#2C2C2C]",
              "hover:border-[#8E7CC3] hover:text-[#D4AF37] hover:bg-transparent",
              selected &&
                "border-[#8E7CC3] text-[#D4AF37] shadow-[0_0_10px_#8E7CC340]"
            )}
          >
            {selected ? selected : triggerText}
            <ChevronDown
              className={clsx(
                "ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform text-[#9C9CA5]",
                open && "rotate-180 text-[#D4AF37]"
              )}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={clsx(
            "w-[90vw] sm:w-[420px] rounded-xl p-2 border border-[#2C2C2C]",
            "bg-[#141416] text-[#EAEAEA] shadow-[0_0_15px_#8E7CC320]"
          )}
        >
          {options.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={clsx(
                "cursor-pointer rounded-md px-3 sm:px-4 py-3 sm:py-3.5 text-base sm:text-lg transition-colors",
                "hover:bg-[#1E1E22] hover:text-[#D4AF37]",
                selected === opt.value &&
                  "bg-[#1C1C1F] text-[#8E7CC3] shadow-[0_0_6px_#8E7CC340]"
              )}
            >
              {opt.icon && <span className="mr-2 text-lg sm:text-xl">{opt.icon}</span>}
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DropdownAbstract