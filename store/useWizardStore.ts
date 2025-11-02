import { create } from "zustand";

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
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    addPlayer: (player: Player) => void;
    removePlayer: (index: number) => void;
    updateField: (key: keyof Omit<WizardState, 'step' | 'setStep' | 'nextStep' | 'prevStep' | 'addPlayer' | 'removePlayer' | 'updateField' | 'reset'>, value: any) => void;
    reset: () => void;
}

export const useWizardStore = create<WizardState>((set, get) => ({
    step: 1,
    players: [],
    setting: "",
    genre: "",
    tone: "",
    courses: 3,
    duration: 3,
    difficulty: 3,
    setStep: (step) => set({ step }),
    nextStep: () => {
        const current = get().step;
        if (current < 4) set({ step: current + 1 });
    },
    prevStep: () => {
        const current = get().step;
        if (current > 1) set({ step: current - 1 });
    },
    addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
    removePlayer: (index) =>
        set((state) => ({
            players: state.players.filter((_, i) => i !== index),
        })),
    updateField: (key, value) => set({ [key]: value } as Partial<WizardState>),
    reset: () => 
        set({
            step: 1,
            players: [],
            setting: "",
            tone: "",
            courses: 3,
            duration: 3,
            difficulty: 3
        }),
}));