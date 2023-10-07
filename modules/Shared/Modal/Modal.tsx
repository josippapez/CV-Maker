'use client';

import { useKeyPress } from '@modules/Shared/Hooks';
import { getAnimation } from '@modules/Shared/Modal/getAnimations';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import style from './Modal.module.scss';
import { createPortal } from 'react-dom';

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

// This is a counter to keep track of how many modals are opened at the same time
let opened = 0;

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
  const escPressed = useKeyPress('Escape');
  const animate = getAnimation(animation);
  const [startClosing, setStartClosing] = useState(false);

  useEffect(() => {
    if (escPressed) setStartClosing(true);
  }, [escPressed, closeModal]);

  useEffect(() => {
    if (opened === 0) {
      document.body.style.overflow = show ? 'hidden' : 'auto';
    }
    if (show) {
      opened++;
    }
    return () => {
      if (show) {
        opened--;
      }
    };
  }, [show]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        closeModal();
        setStartClosing(false);
      }}
    >
      {show && !startClosing && (
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
    document.body
  );
};
