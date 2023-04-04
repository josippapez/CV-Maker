import { useInView } from 'framer-motion';
import { FC, ReactNode, RefObject, useRef } from 'react';

type Props = {
  children: ReactNode | ((isInView: boolean) => JSX.Element);
  root?: RefObject<HTMLElement> | null;
  sectionClass?: string;
};

export const LandingPageSection: FC<Props> = ({
  children,
  root,
  sectionClass,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.75,
    once: true,
    root: root || undefined,
  });

  return (
    <section
      ref={ref}
      className={`box-border flex h-full w-full justify-start overflow-hidden ${
        sectionClass || ''
      }`}
    >
      {typeof children === 'function' ? children(isInView) : children}
    </section>
  );
};
