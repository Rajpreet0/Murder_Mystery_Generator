"use client";
import DropdownAbstract from "@/components/DropdownAbstract"
import { useWizardStore } from "@/store/useWizardStore"

const StepTwo = () => {
  const { setting, tone, genre, updateField } = useWizardStore();

  const epochOptions = [
    { value: "Historisch", label: "🕯️ Historisch / Klassisch" },
    { value: "Fantasy", label: "🔮 Mystisch / Fantasie" },
    { value: "Modern", label: "💼 Modern / Urban" },
    { value: "SciFi", label: "🚀 Futuristisch / Sci-Fi" },
    { value: "Exotisch", label: "🏝️ Exotisch / Abenteuerlich" },
  ];

  const genreOptions = [
    { value: "Klassik", label: "🕵️‍♂️ Klassischer Krimi" },
    { value: "Komoedie", label: "😂 Komödie / Parodie" },
    { value: "Drama", label: "💔 Drama" },
    { value: "Thriller", label: "⚙️ Thriller" },
    { value: "Mystery", label: "🧙 Mystery / Übernatürlich" },
    { value: "Noir", label: "🎬 Film-Noir / Retro" },
  ]

  const toneOptions = [
    { value: "Elegant", label: "🎩 Elegant & klassisch" },
    { value: "Humor", label: "😂 Humorvoll & sarkastisch" },
    { value: "Klever", label: "🧠 Clever & analytisch" },
    { value: "Dark", label: "💀 Düster & ernst" },
    { value: "Modern", label: "🌈 Locker & modern" },
  ]

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <DropdownAbstract
        triggerText="Epoche / Setting wählen"
        label="Epoche / Setting"
        description="Bestimmt Zeit und Ort deiner Geschichte – z. B. 1920er Jahre oder eine futuristische Raumstation."
        options={epochOptions}
        selected={setting}
        onSelect={(val) => updateField("setting", val)}
      />

      <DropdownAbstract
        triggerText="Genre wählen"
        label="Genre"
        description="Legt die Art des Krimis fest – von klassischem Mordfall bis zur humorvollen Parodie."
        options={genreOptions}
        selected={genre}
        onSelect={(val) => updateField("genre", val)}
      />

      <DropdownAbstract
        triggerText="Ton / Sprachstil wählen"
        label="Ton"
        description="Definiert die Stimmung – elegant, düster oder modern – und prägt das gesamte Dinner-Erlebnis."
        options={toneOptions}
        selected={tone}
        onSelect={(val) => updateField("tone", val)}
      />
    </div>
  )
}

export default StepTwo