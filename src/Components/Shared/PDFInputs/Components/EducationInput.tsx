import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import { AddNewButton } from './AddNewButton';
import EducationItem from './EducationItem';

interface Props {
  selectedTab: boolean;
}

export const EducationInput = (props: Props) => {
  const { education, setEducation } = useContext(PDFViewContext);
  const { t } = useTranslation('EducationInput');

  const { selectedTab } = props;

  return (
    <div hidden={!selectedTab}>
      {education.map((item, index) => (
        <EducationItem
          key={`EducationInput-${index}`}
          education={item}
          educationList={education}
          setEducation={setEducation}
          index={index}
        />
      ))}
      <AddNewButton
        onClick={() => {
          setEducation([
            ...education,
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
