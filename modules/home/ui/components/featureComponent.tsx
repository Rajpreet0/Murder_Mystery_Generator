"use client";

import { CheckCircle2, CircleX } from "lucide-react";

interface FeatureComponentProps {
    text: string;
    isFree: boolean;

}

const FeatureComponent: React.FC<FeatureComponentProps> = ({text, isFree}) => {
  return (
    <div className="flex items-center justify-between max-w-xs gap-2 text-[#CFCFCF]">
        <span className={`text-sm text-center ${isFree ? "text-[#888888]" : "text-[#CFCFCF]"}`}>{text}</span>
        {isFree ? (
            <CircleX className="text-[#888888] w-4 h-4 shrink-0"/>
        ) : (
            <CheckCircle2 className="text-[#8E7CC3] w-4 h-4 shrink-0"/>
       )}
    </div>
  )
}

export default FeatureComponent