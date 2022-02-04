import { usePDF } from '@react-pdf/renderer';
import { useEffect, useRef, useState } from 'react';
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
}

export interface Certificate {
  name: string;
  date: string;
  institution: string;
  description: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

const PDFView = () => {
  const [generalInfo, setGeneralInfo] = useState<Input>({
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
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      name: 'Frontend Developer',
      date: new Date().toLocaleDateString('hr'),
      description: 'test',
      institution: 'test',
    },
    {
      name: 'Frontend Developer',
      date: new Date().toLocaleDateString('hr'),
      description: 'test',
      institution: 'test',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      school: 'University of Zagreb',
      location: 'Zagreb, Hrvatska',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'test',
    },
    {
      school: 'University of Zagreb',
      location: 'Zagreb, Hrvatska',
      degree: 'Master of Science',
      fieldOfStudy: 'Computer Science',
      startDate: new Date().toLocaleDateString('hr'),
      endDate: new Date().toLocaleDateString('hr'),
      description: 'test',
    },
  ]);

  const [instance, updateInstance] = usePDF({
    document: CVTemplate1({
      generalInfo,
      professionalExperience,
      certificates,
      education,
    }),
  });

  const updateInstanceRef: { current: null | ReturnType<typeof setTimeout> } =
    useRef(null);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [generalInfo, professionalExperience, certificates, education]);

  return (
    <PDFViewPresenter
      pdfInstance={instance}
      setGeneralInfo={setGeneralInfo}
      generalInfo={generalInfo}
      setProfessionalExperience={setProfessionalExperience}
      professionalExperience={professionalExperience}
      setCertificates={setCertificates}
      certificates={certificates}
      setEducation={setEducation}
      education={education}
    />
  );
};

export default PDFView;
