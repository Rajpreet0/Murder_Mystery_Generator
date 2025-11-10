import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface TooltipAbstractProps {
    tooltipText: string;
    children: React.ReactNode;
}


const TooltipAbstract: React.FC<TooltipAbstractProps> = ({
    tooltipText, children
}) => {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent className="tracking-wider text-md bg-lightBlack">
            {tooltipText}
        </TooltipContent>
    </Tooltip>
  )
}

export default TooltipAbstract