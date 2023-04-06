import { useKeyPress } from '@modules/Shared/Hooks';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { getAnimation } from '@modules/Shared/Modal/getAnimations';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.scss';

interface Props {
  testid?: string;
  closeModal?(): void;
  position?: 'center' | 'left' | 'right' | 'bottom' | 'top';
  children: React.ReactNode;
  contentClassname?: string;
  show: boolean;
  width?: 'screen' | string;
  height?: 'screen' | string;
  zindex?: number;
  animation?:
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'slide-top'
    | 'slide-bottom';
}

export const Modal: FC<Props> = ({
  closeModal = () => {
    return;
  },
  position = 'center',
  children,
  show,
  width = 'auto',
  height = 'auto',
  animation,
  zindex = 30,
  contentClassname,
  testid,
}) => {
  const windowSize = useWindowSize();
  const escPressed = useKeyPress('Escape');
  const animate = getAnimation(animation);

  useEffect(() => {
    if (escPressed) closeModal();
  }, [escPressed, closeModal]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid={testid}
          initial={'hide'}
          animate={'show'}
          exit={'hide'}
          variants={{
            show: {
              background: 'rgba(0, 0, 0, 0.5)',
              transition: {
                duration: 0.15,
              },
            },
            hide: {
              background: 'rgba(0, 0, 0, 0.0)',
              transition: {
                duration: 0.05,
                delay: 0.15,
              },
            },
          }}
          id='modal-overlay'
          aria-hidden='true'
          role='button'
          style={{
            zIndex: zindex,
          }}
          className={`
            overflow-hidden
            ${style.overlay}
            ${style[`${position}`]}
          `}
          onMouseDown={() => closeModal()}
          onTouchStart={e => e.stopPropagation()}
        >
          <motion.div
            initial={'hide'}
            animate={'show'}
            exit={'hide'}
            variants={animate}
            id={style['modal-children']}
            aria-hidden='true'
            className={`${
              contentClassname ?? ''
            } relative subpixel-antialiased`}
            onMouseDown={e => e.stopPropagation()}
            style={{
              width: width === 'screen' ? '100vw' : width,
              height: height === 'screen' ? '100vh' : height,
              maxHeight: window.innerHeight + 'px',
              zIndex: zindex ? zindex + 1 : 'auto',
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('__next') as Element
  );
};
