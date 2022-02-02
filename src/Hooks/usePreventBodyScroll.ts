import React from 'react';

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
  const [position, setPosition] = React.useState<
    'left' | 'right' | 'inbetween' | null
  >(null);

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
          setPosition('right');
        } else if (scrolled === ref.current.clientWidth) {
          ref.current.classList.remove('scroll-x', 'scroll-x-right');
          ref.current.classList.add('scroll-x-left');
          setPosition('left');
        } else {
          ref.current.classList.remove('scroll-x-left', 'scroll-x-right');
          ref.current.classList.add('scroll-x');
          setPosition('inbetween');
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

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll, position };
}

export default usePreventBodyScroll;
