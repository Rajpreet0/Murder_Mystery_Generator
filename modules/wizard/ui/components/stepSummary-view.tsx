"use client";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/store/useWizardStore"
import { Drama, HandPlatter, Sparkles, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const SummaryView = () => {
    const { players, setting, genre, tone, courses, duration, difficulty } = useWizardStore();
    const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-3xl px-4 sm:px-0 text-[#EAEAEA]">
        <div className="text-center">
            <p className="text-sm sm:text-base text-[#9C9CA5]">
            Überprüfe deine Angaben, bevor das Dinner generiert wird.
            </p>
        </div>

        {/* Player Section */}
        <div className="w-full bg-[#141416] border border-[#2C2C2C] rounded-xl p-6 shadow-[0_0_15px_#8E7CC320]">
            <h3 className="flex items-center text-lg font-semibold mb-3">
                <Users className="mr-2 text-[#8E7CC3]" /> Teilnehmer
            </h3>
            {players.length > 0 ? (
            <ul className="flex flex-col gap-3">
                {players.map((p, i) => (
                <li
                    key={i}
                    className="flex justify-between items-center border-b border-[#2C2C2C] pb-2"
                >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-[#9C9CA5] text-sm">{p.email}</span>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-[#9C9CA5] text-sm">Keine Spieler hinzugefügt</p>
            )}
        </div>

        {/* Story Settings Section */}
        <div className="w-full bg-[#141416] border border-[#2C2C2C] rounded-xl p-6 shadow-[0_0_15px_#8E7CC320]">
            <h3 className="flex items-center text-lg font-semibold mb-3 ">
                <Drama className="mr-2 text-[#8E7CC3]"/> Story & Stimmung
            </h3>

            <div className="flex flex-col gap-2 text-sm sm:text-base">
                <div className="flex justify-between border-b border-[#2C2C2C] pb-2">
                    <span className="text-[#9C9CA5]">Setting / Epoche:</span>
                    <span className="font-medium text-[#EAEAEA]">
                    {setting || "—"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-[#2C2C2C] pb-2">
                    <span className="text-[#9C9CA5]">Genre:</span>
                    <span className="font-medium text-[#EAEAEA]">{genre || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-[#2C2C2C] pb-2">
                    <span className="text-[#9C9CA5]">Ton / Sprachstil:</span>
                    <span className="font-medium text-[#EAEAEA]">{tone || "—"}</span>
                </div>
            </div>
        </div>

        {/* Dinner Settings Section */}
        <div className="w-full bg-[#141416] border border-[#2C2C2C] rounded-xl p-6 shadow-[0_0_15px_#8E7CC320]">
            <h3 className="flex items-center text-lg font-semibold mb-3 ">
                <HandPlatter className="mr-2 text-[#8E7CC3]"/> Dinner-Details
            </h3>

            <div className="flex flex-col gap-2 text-sm sm:text-base">
            <div className="flex justify-between border-b border-[#2C2C2C] pb-2">
                <span className="text-[#9C9CA5]">Gänge:</span>
                <span className="font-medium">{courses}</span>
            </div>
            <div className="flex justify-between border-b border-[#2C2C2C] pb-2">
                <span className="text-[#9C9CA5]">Dauer (1–5):</span>
                <span className="font-medium">{duration}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-[#9C9CA5]">Schwierigkeitsgrad:</span>
                <span className="font-medium">{difficulty}</span>
            </div>
            </div>
        </div>

        {/* Action Buttons */}
        <Button
            onClick={() => router.push("/generated")}
            className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white rounded-lg px-6 py-3 text-base cursor-pointer flex items-center gap-2"
            >
                <Sparkles className="h-4 w-4" /> Generiere
        </Button>
    </div>
  )
}

export default SummaryView