import { useMemo } from 'react';

type Props = {
  landingPageSections: React.FC[];
};

const LandingPageSections = (props: Props) => {
  const { landingPageSections } = props;

  return useMemo(
    () => (
      <>
        {landingPageSections.map((LPSection, index) => (
          <section id={`section-${index}`} key={index} className='h-full'>
            <LPSection />
          </section>
        ))}
      </>
    ),
    [landingPageSections]
  );
};

export default LandingPageSections;
