import { useMemo } from 'react';

type Props = {
  landingPageSections: { (): React.ReactNode }[];
};

const LandingPageSections = (props: Props) => {
  const { landingPageSections } = props;

  return useMemo(
    () => (
      <div>
        {landingPageSections.map((section, index) => (
          <section
            id={`section-${index}`}
            key={index}
            className='flex justify-center h-screen items-center'
          >
            {section()}
          </section>
        ))}
      </div>
    ),
    [landingPageSections]
  );
};

export default LandingPageSections;
