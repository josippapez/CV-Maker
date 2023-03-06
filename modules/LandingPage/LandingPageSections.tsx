import { createRef, useMemo } from 'react';

type Props = {
  landingPageSections: React.FC<{ props: any; ref: any }>[];
};

export const LandingPageSections = (props: Props) => {
  const { landingPageSections } = props;
  return useMemo(
    () => (
      <>
        {landingPageSections.map((LPSection, index) => {
          const ref = createRef();
          return (
            <section
              id={`section-${index}`}
              key={index}
              className='h-full w-full'
            >
              <LPSection props={undefined} ref={ref} />
            </section>
          );
        })}
      </>
    ),
    [landingPageSections]
  );
};
