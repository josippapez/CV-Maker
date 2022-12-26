import { createRef, useMemo, useRef } from 'react';

type Props = {
  landingPageSections: React.FC<{ props: any; ref: any }>[];
};

const LandingPageSections = (props: Props) => {
  const { landingPageSections } = props;
  // const componentRef = useRef(null);

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

export default LandingPageSections;
