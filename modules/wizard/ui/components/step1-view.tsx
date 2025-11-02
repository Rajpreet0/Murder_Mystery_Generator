"use client"
import { useWizardStore } from "@/store/useWizardStore"
import PlayerInput from "./PlayerInput"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusCircle, Plus } from "lucide-react";

const StepOne = () => {
    const { players, addPlayer, removePlayer } = useWizardStore();
    const [newPlayer, setNewPlayer] = useState({ name: "", email: "" });

    const handleAdd = () => {
      if (!newPlayer.name || !newPlayer.email) return;
      addPlayer(newPlayer);
      setNewPlayer({ name: "", email: "" });
    }
  
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4 sm:px-0">

      {players.length < 4 && (
        <p className="text-sm text-[#E04F5F] -mt-3 text-center">
          Mindestens 4 Spieler erforderlich (aktuell {players.length})
        </p>
      )}


      <div className="w-full bg-[#141416] border border-[#2C2C2C] rounded-xl p-6 shadow-[0_0_15px_#8E7CC320]">
        <PlayerInput
          label={`Spieler ${players.length + 1}`}
          name={newPlayer.name}
          email={newPlayer.email}
          onNameChange={(name) => setNewPlayer({ ...newPlayer, name })}
          onEmailChange={(email) => setNewPlayer({ ...newPlayer, email })}
        />

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleAdd}
            className="bg-[#8E7CC3] hover:bg-[#A89FD4] text-white rounded-lg px-5 py-2 text-base cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" /> Spieler hinzufügen
          </Button>
        </div>
      </div>

      {players.length > 0 && (
        <div className="mt-6 w-full flex flex-col gap-3">
          {players.map((p, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#1B1C22] border border-[#2C2C2C] rounded-lg px-5 py-3 hover:border-[#8E7CC3] transition-colors"
            >
              <div>
                <p className="font-medium text-[#EAEAEA]">{p.name}</p>
                <p className="text-sm text-[#9C9CA5]">{p.email}</p>
              </div>
              <Button
                onClick={() => removePlayer(index)}
                size="sm"
                variant="ghost"
                className="text-[#E04F5F] hover:text-red-400 hover:bg-transparent cursor-pointer"
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StepOne