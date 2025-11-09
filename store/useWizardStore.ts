import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Player {
    name: string;
    email: string;
}

interface WizardState {
    step: number;
    players: Player[];
    setting: string;
    genre: string;
    tone: string;
    courses: number;
    duration: number;
    difficulty: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aiResponse?: any;
    regenCount: number;
    incrementRegenCount: () => void;
    resetRegenCount: () => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    addPlayer: (player: Player) => void;
    removePlayer: (index: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (key: keyof Omit<WizardState, 'step' | 'setStep' | 'nextStep' | 'prevStep' | 'addPlayer' | 'removePlayer' | 'updateField' | 'reset'>, value: any) => void;
    reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      step: 1,
      players: [],
      setting: "",
      genre: "",
      tone: "",
      courses: 3,
      duration: 3,
      difficulty: 3,
      aiResponse: null,
      regenCount: 0,

      // 🧭 STEP CONTROLS
      setStep: (step) => set({ step }),
      nextStep: () => {
        const current = get().step;
        if (current < 5) set({ step: current + 1 });
      },
      prevStep: () => {
        const current = get().step;
        if (current > 1) set({ step: current - 1 });
      },
      addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
      removePlayer: (index) => set((state) => ({
          players: state.players.filter((_, i) => i !== index),
      })),
      incrementRegenCount: () => {
        const current = get().regenCount;
        if (current < 3) set({ regenCount: current + 1 });
      },
      resetRegenCount: () => set({ regenCount: 0}),
      updateField: (key, value) => set({ [key]: value } as Partial<WizardState>),
      reset: () => {
        set({
          step: 1,
          players: [],
          setting: "",
          genre: "",
          tone: "",
          courses: 3,
          duration: 3,
          difficulty: 3,
          aiResponse: null,
          regenCount: 0,
        });
        localStorage.removeItem("wizard-storage");
      },
    }),
    {
      name: "wizard-storage",
      partialize: (state) => ({
        step: state.step,
        players: state.players,
        setting: state.setting,
        genre: state.genre,
        tone: state.tone,
        courses: state.courses,
        duration: state.duration,
        difficulty: state.difficulty,
        aiResponse: state.aiResponse,
        regenCount: state.regenCount,
      }),
    }
  )
);