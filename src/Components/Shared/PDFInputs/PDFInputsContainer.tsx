import { Input, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
import PDFInputsPresenter from './PDFInputsPresenter';

type Props = {
  setGeneralInfo(generalInfo: Input): void;
  generalInfo: Input;
  updateInstance(): void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience(
    professionalExperience: ProfessionalExperience[]
  ): void;
};

const PDFInputsContainer = (props: Props) => {
  const {
    setGeneralInfo,
    generalInfo,
    updateInstance,
    professionalExperience,
    setProfessionalExperience,
  } = props;
  return (
    <PDFInputsPresenter
      generalInfo={generalInfo}
      setGeneralInfo={setGeneralInfo}
      updateInstance={updateInstance}
      professionalExperience={professionalExperience}
      setProfessionalExperience={setProfessionalExperience}
    />
  );
};

export default PDFInputsContainer;
