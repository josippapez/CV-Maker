import { useMemo } from 'react';

type Props = {
  landingPageSections: { (): React.ReactNode }[];
};

const LandingPageSections = (props: Props) => {
  const { landingPageSections } = props;

  return useMemo(
    () => (
      <>
        {landingPageSections.map((section, index) => (
          <section id={`section-${index}`} key={index} className='h-full'>
            {section()}
          </section>
        ))}
      </>
    ),
    [landingPageSections]
  );
};

export default LandingPageSections;
