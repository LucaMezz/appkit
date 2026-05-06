import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import { Button } from "../../shadcn-ui/button";
import { Kbd, KbdGroup } from "../../shadcn-ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../shadcn-ui/tooltip";

export function HistoryControls() {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-0.5" style={{ WebkitAppRegion: "no-drag" }}>
      <Tooltip>
        <TooltipContent collisionPadding={12}>
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Back</p>
            <KbdGroup>
              <Kbd>Alt</Kbd>
              <Kbd>←</Kbd>
            </KbdGroup>
          </div>
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-r-none w-7 h-6"
            onClick={() => navigate(-1)}
          >
            <GoArrowLeft />
          </Button>
        </TooltipTrigger>
      </Tooltip>
      <Tooltip>
        <TooltipContent collisionPadding={12}>
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Forward</p>
            <KbdGroup>
              <Kbd>Alt</Kbd>
              <Kbd>→</Kbd>
            </KbdGroup>
          </div>
        </TooltipContent>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-l-none w-7 h-6"
            onClick={() => navigate(1)}
          >
            <GoArrowRight />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  );
}
