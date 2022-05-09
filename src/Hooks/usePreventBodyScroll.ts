import React from 'react';

export enum scrollPosition {
  left = 'left',
  right = 'right',
  inbetween = 'inbetween',
}

const isOverflown = ({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

const preventDefault = (ev: Event) => {
  if (ev.preventDefault) {
    ev.preventDefault();
  }
};

function usePreventBodyScroll(ref: React.RefObject<HTMLElement>) {
  const [hidden, setHidden] = React.useState(false);
  const [position, setPosition] = React.useState<scrollPosition | null>(null);

  const handleScroll = (ev: WheelEvent) => {
    preventDefault(ev);
    if (ref.current) {
      ref.current.scrollLeft += ev.deltaY;
      const scrolled: number = parseInt(
        (ref.current.scrollWidth - ref.current.scrollLeft).toFixed()
      );

      if (isOverflown(ref.current)) {
        if (scrolled === ref.current.scrollWidth) {
          ref.current.classList.remove('scroll-x', 'scroll-x-left');
          ref.current.classList.add('scroll-x-right');
          setPosition(scrollPosition.right);
        } else if (scrolled === ref.current.clientWidth) {
          ref.current.classList.remove('scroll-x', 'scroll-x-right');
          ref.current.classList.add('scroll-x-left');
          setPosition(scrollPosition.left);
        } else {
          ref.current.classList.remove('scroll-x-left', 'scroll-x-right');
          ref.current.classList.add('scroll-x');
          setPosition(scrollPosition.inbetween);
        }
      }
    }
  };

  React.useEffect(() => {
    hidden
      ? document.addEventListener('wheel', handleScroll, {
          passive: false,
        })
      : document.removeEventListener('wheel', handleScroll, false);
    return () => {
      document.removeEventListener('wheel', handleScroll, false);
    };
  }, [hidden]);

  React.useEffect(() => {
    if (ref.current) {
      handleScroll(
        new WheelEvent('wheel', {
          deltaY: 10,
          deltaX: 0,
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }, []);

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll, position };
}

export default usePreventBodyScroll;
