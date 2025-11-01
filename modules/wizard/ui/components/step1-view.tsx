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
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">

      {players.length < 4 && (
        <p className="text-sm text-danger">
          Mindestens 4 Spieler erforderlich (aktuell {players.length})
        </p>
      )}

      <PlayerInput
        label={`Spieler ${players.length + 1}:`}
        name={newPlayer.name}
        email={newPlayer.email}
        onNameChange={(name) => setNewPlayer({ ...newPlayer, name })}
        onEmailChange={(email) => setNewPlayer({ ...newPlayer, email })}
      />

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <Button onClick={handleAdd} className="bg-primary hover:bg-primaryHover cursor-pointer">
          <Plus/> Spieler hinzufügen
        </Button>
      </div>

      <div className="mt-6 w-full flex flex-col gap-3">
        {players.map((p, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-surface p-3 rounded-md border border-[#2a2a2a]"
          >
            <div>
              <p className="font-medium text-textMain">{p.name}</p>
              <p className="text-sm text-textSubtle">{p.email}</p>
            </div>
            <Button
              onClick={() => removePlayer(index)}
              size="sm"
              className="bg-transparent cursor-pointer"
            >
              <MinusCircle/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepOne