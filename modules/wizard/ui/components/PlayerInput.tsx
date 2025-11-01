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
    <div>
        <p className="text-lg">{label}</p>
        <div className="flex gap-4 mt-2">
            <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
            />
        </div>
    </div>
  )
}

export default PlayerInput