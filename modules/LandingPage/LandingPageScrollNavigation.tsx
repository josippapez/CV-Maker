import disableScroll from 'disable-scroll';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  landingPageSections: React.FC<{ props: any; ref: any }>[];
};

export const LandingPageScrollNavigation = (props: Props) => {
  const { landingPageSections } = props;
  const [scrolledIndex, setScrolledIndex] = useState(0);

  const isScrollingTimeout: { current: null | ReturnType<typeof setTimeout> } =
    useRef(null);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
      isScrollingTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) {
          if (scrolledIndex < landingPageSections.length - 1) {
            setScrolledIndex(scrolledIndex + 1);
          }
        } else {
          if (scrolledIndex > 0) {
            setScrolledIndex(scrolledIndex - 1);
          }
        }
      }, 200);
    },
    [scrolledIndex, landingPageSections]
  );

  const scrollToSection = useCallback((index: number) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  useEffect(() => {
    scrollToSection(scrolledIndex);
  }, [scrolledIndex]);

  useEffect(() => {
    disableScroll.on();
    document.addEventListener('wheel', handleScroll);
    return () => {
      disableScroll.off();
      document.removeEventListener('wheel', handleScroll);
    };
  }, [scrolledIndex]);

  return useMemo(
    () => (
      <div className='fixed top-2/4 right-5 flex h-[calc(2_*_40px)] flex-col justify-evenly'>
        {landingPageSections.map((section, index) => (
          <div
            key={`${index}-circle`}
            onClick={() => {
              scrollToSection(index);
              setScrolledIndex(index);
            }}
            className={`rounded-full ${
              scrolledIndex === index
                ? 'bg-slate-600 dark:bg-slate-300'
                : 'bg-slate-300 dark:bg-slate-600'
            } h-3 w-3 cursor-pointer`}
          />
        ))}
      </div>
    ),
    [scrolledIndex]
  );
};
