import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  tooltipText: string;
  delayShow?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  showOnClick?: boolean;
};

export const Tooltip: FC<Props> = ({
  children,
  tooltipText,
  delayShow = 0,
  position = 'right',
  showOnClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const updateInstanceRef: { current: null | ReturnType<typeof setTimeout> } =
    useRef(null);

  const handleShow = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const handleHide = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const handleClicked = useCallback(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }

    setShowTooltip(true);

    updateInstanceRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  }, []);

  const getPostion = useMemo(() => {
    switch (position) {
      case 'bottom':
        return 'top-[100%] self-center mt-3';
      case 'top':
        return 'bottom-[100%] self-center mb-3';
      case 'right':
        return 'left-[100%] self-center ml-3';
      case 'left':
        return 'right-[100%] self-center mr-3';
      default:
        return 'left-[100%] self-center ml-3';
    }
  }, [position]);

  return (
    <div className='flex'>
      <div
        onMouseEnter={!showOnClick ? handleShow : undefined}
        onMouseLeave={!showOnClick ? handleHide : undefined}
        onClick={showOnClick ? handleClicked : undefined}
      >
        {children}
      </div>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={{
              hidden: {
                opacity: 0,
                x: -10,
                transition: { duration: 0.2, repeatDelay: 0.5 },
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: delayShow,
                  duration: 0.2,
                  repeatDelay: 0.5,
                },
              },
            }}
            className={`absolute w-max rounded-md bg-gray-200 p-3 ${getPostion} drop-shadow-md`}
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
