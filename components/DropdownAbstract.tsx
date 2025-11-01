import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface DropdownAbstractProps {
    triggerText: string;
    children: React.ReactNode;
}

const DropdownAbstract: React.FC<DropdownAbstractProps> = ({triggerText, children}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>{triggerText}</DropdownMenuTrigger>
        <DropdownMenuContent>
            {children}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownAbstract