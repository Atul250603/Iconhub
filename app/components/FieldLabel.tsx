import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";

export default function FieldLabel({ label, description }: { label: string, description: string }) {
  return (
    <div className="flex items-center gap-2">
        <div className="text-sm font-semibold">{label}</div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
                <CircleQuestionMark className="size-4 text-muted-foreground"/>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-sm">{description}</span>
            </TooltipContent>
          </Tooltip>
        </div>
    </div>
  )
}