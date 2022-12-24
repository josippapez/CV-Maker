import { useTranslation } from 'react-i18next';
import { Education } from '../../../PDFView/models';
import { AddNewButton } from './AddNewButton';
import EducationItem from './EducationItem';

interface Props {
  selectedTab: boolean;
  setEducation: (educations: Education[]) => void;
  educations: Education[];
}

export const EducationInput = (props: Props) => {
  const { t } = useTranslation('EducationInput');

  const { selectedTab, setEducation, educations } = props;

  return (
    <div hidden={!selectedTab}>
      {educations.map((education, index) => (
        <EducationItem
          key={`EducationInput-${index}`}
          education={education}
          educations={educations}
          setEducation={setEducation}
          selectedTab={selectedTab}
          index={index}
        />
      ))}
      <AddNewButton
        onClick={() => {
          setEducation([
            ...educations,
            {
              url: '',
              course: '',
              location: '',
              school: '',
              degree: '',
              fieldOfStudy: '',
              startDate: '',
              endDate: '',
              description: '',
            },
          ]);
        }}
        title={t('addEducation')}
      />
    </div>
  );
};
