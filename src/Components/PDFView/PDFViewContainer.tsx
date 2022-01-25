import { usePDF } from '@react-pdf/renderer';
import { useState } from 'react';
import CVTemplate1 from './CVTemplates/CVTemplate1';
import PDFViewPresenter from './PDFViewPresenter';
export interface ProfessionalExperience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}
export interface Input {
  firstName: string;
  lastName: string;
  aboutMe: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  website: string;
  date: string;
  dateOfBirth: string;
}

const PDFView = () => {
  const [firstInput, setFirstInput] = useState<Input>({
    firstName: 'Josip',
    lastName: 'Papež',
    aboutMe: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet`,
    position: 'Frontend Developer',
    email: 'papezjosip@gmail.com',
    phone: '098 972 9176',
    address: 'Mije Kišpatića 64',
    city: 'Osijek',
    zip: '',
    country: 'Hrvatska',
    website: '',
    date: '',
    dateOfBirth: '',
  });

  const [professionalExperience, setProfessionalExperience] = useState<
    ProfessionalExperience[]
  >([
    {
      company: 'Code Consulting Ltd.',
      position: 'Frontend Developer',
      location: 'Vukovar, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
    {
      company: 'Async Labs',
      position: 'Frontend Developer',
      location: 'Zagreb, Hrvatska',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'Site development with React, Redux',
    },
  ]);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate1({ firstInput, professionalExperience }),
  });

  return (
    <PDFViewPresenter
      pdfInstance={instance}
      updateInstance={updateInstance}
      setFirstInput={setFirstInput}
      firstInput={firstInput}
      setProfessionalExperience={setProfessionalExperience}
      professionalExperience={professionalExperience}
    />
  );
};

export default PDFView;
