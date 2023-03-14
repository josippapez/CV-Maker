import { useKeyPress } from '@modules/Shared/Hooks';
import { useWindowSize } from '@modules/Shared/Hooks/useWindowSize';
import { getAnimation } from '@modules/Shared/Modal/getAnimations';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.scss';

interface Props {
  closeModal(): void;
  position?: 'center' | 'left' | 'right' | 'bottom' | 'top';
  children: JSX.Element;
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
  ratio?:
    | '1 / 1'
    | '4 / 3'
    | '16 / 9'
    | '16 / 10'
    | '21 / 9'
    | '9 / 16'
    | '3 / 4'
    | string;
}

export const Modal = (props: Props): JSX.Element => {
  const windowSize = useWindowSize();
  const escPressed = useKeyPress('Escape');
  const {
    closeModal,
    position,
    children,
    show,
    width,
    height,
    animation,
    ratio,
    contentClassname,
    zindex,
  } = props;

  const animate = getAnimation(animation);

  useEffect(() => {
    if (escPressed) closeModal();
  }, [escPressed, closeModal]);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
  }, [show]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={'hide'}
          animate={'show'}
          exit={'hide'}
          variants={{
            show: {
              opacity: 1,
              transition: {
                duration: 0.15,
              },
            },
            hide: {
              opacity: 0,
              transition: {
                duration: 0.05,
                delay: 0.15,
              },
            },
          }}
          style={{
            zIndex: zindex,
          }}
          id='modal-overlay'
          aria-hidden='true'
          role='button'
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
            id='modal-children'
            aria-hidden='true'
            className={`
              overflow-auto
              ${style.children}
              ${contentClassname}
              relative
              flex flex-col
              subpixel-antialiased
            `}
            onMouseDown={e => e.stopPropagation()}
            style={{
              width: width === 'screen' ? '100vw' : width,
              height: height === 'screen' ? '100vh' : height,
              maxHeight: windowSize.height + 'px',
              aspectRatio: ratio,
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

Modal.defaultProps = {
  zindex: 30,
  position: 'center',
  width: 'auto',
  ratio: 'auto',
  closeModal: () => {
    return;
  },
};
