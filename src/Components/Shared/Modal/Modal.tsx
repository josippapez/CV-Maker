import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import useWindowSize from '../../../Hooks/useWindowSize';
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

let opened = 0;

const Modal = (props: Props): JSX.Element => {
  const windowSize = useWindowSize();
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

  const getAnimation = () => {
    const transition = {
      duration: 0.15,
    };
    switch (animation) {
      case 'slide-left':
        return {
          show: {
            x: 0,
            transition,
          },
          hide: {
            x: '-100%',
            transition,
          },
        };
      case 'slide-right':
        return {
          show: {
            x: 0,
            transition,
          },
          hide: {
            x: '100%',
            transition,
          },
        };
      case 'slide-top':
        return {
          show: {
            y: 0,
            transition,
          },
          hide: {
            y: '-100%',
            transition,
          },
        };
      case 'slide-bottom':
        return {
          show: {
            y: 0,
            transition,
          },
          hide: {
            y: '100%',
            transition,
          },
        };
      case 'fade':
        return {
          show: {
            opacity: 1,
            transition,
          },
          hide: {
            opacity: 0,
            transition,
          },
        };
      default:
        return {
          show: {
            opacity: 1,
            transform: 'scale(1)',
            transition,
          },
          hide: {
            transform: 'scale(0.95)',
            opacity: 0,
            transition,
          },
        };
    }
  };

  const animate = getAnimation();

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

export default Modal;
