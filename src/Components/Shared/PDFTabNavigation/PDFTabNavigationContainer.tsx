import { Tab } from '../PDFInputs/PDFInputsContainer';
import PDFTabNavigationPresenter from './PDFTabNavigationPresenter';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

const PDFTabNavigation = (props: Props) => {
  const { setSelectedTab, selectedTab } = props;

  return (
    <PDFTabNavigationPresenter
      setSelectedTab={setSelectedTab}
      selectedTab={selectedTab}
    />
  );
};

export default PDFTabNavigation;
