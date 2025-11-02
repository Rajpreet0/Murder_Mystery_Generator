import { Input } from "@/components/ui/input"

interface PlayerInputProps {
    label: string;
    name: string;
    email: string;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({label, name, email, onNameChange, onEmailChange}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-lg font-semibold text-[#EAEAEA] mb-2">
        {label}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="flex-1 bg-[#1B1C22] border border-[#2C2C2C] text-[#EAEAEA] placeholder-[#6B6B6B] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8E7CC3]"
        />
        <Input
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="flex-1 bg-[#1B1C22] border border-[#2C2C2C] text-[#EAEAEA] placeholder-[#6B6B6B] rounded-lg focus-visible:ring-1 focus-visible:ring-[#8E7CC3]"
        />
      </div>
    </div>
  )
}

export default PlayerInput