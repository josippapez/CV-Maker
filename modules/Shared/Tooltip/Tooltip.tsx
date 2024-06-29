import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipShadCn,
} from '@/components/ui/tooltip';
import { useDebouncedValue } from '@modules/Shared/Hooks';
import { FC, ReactNode, useCallback } from 'react';

type Props = {
  children: ReactNode;
  tooltipText: string;
  delayShow?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showOnClick?: boolean;
  onClick?: () => void;
};

export const Tooltip: FC<Props> = ({
  children,
  tooltipText,
  delayShow = 0,
  position = 'right',
  showOnClick,
  onClick,
}) => {
  const [showTooltip, setShowTooltip, resetValue] = useDebouncedValue(
    false,
    1000
  );

  const handleClicked = useCallback(() => {
    resetValue(true);
    setShowTooltip(false);
    onClick && onClick();
  }, []);

  if (showOnClick) {
    return (
      <TooltipProvider delayDuration={delayShow}>
        <TooltipShadCn open={showTooltip} onOpenChange={setShowTooltip}>
          <TooltipTrigger
            onClick={handleClicked}
            onMouseEnter={e => e.preventDefault()}
            onMouseLeave={e => e.preventDefault()}
            onMouseOver={e => e.preventDefault()}
          >
            {children}
          </TooltipTrigger>
          <TooltipContent side={position} sideOffset={10}>
            {tooltipText}
          </TooltipContent>
        </TooltipShadCn>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={delayShow}>
      <TooltipShadCn>
        <TooltipTrigger onClick={onClick}>{children}</TooltipTrigger>
        <TooltipContent side={position} sideOffset={10}>
          {tooltipText}
        </TooltipContent>
      </TooltipShadCn>
    </TooltipProvider>
  );
};
