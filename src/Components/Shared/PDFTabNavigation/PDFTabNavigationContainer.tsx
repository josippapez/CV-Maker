import { useRef } from 'react';
import usePreventBodyScroll from '../../../Hooks/usePreventBodyScroll';
import { Tab } from '../PDFInputs/PDFInputsContainer';
import PDFTabNavigationPresenter from './PDFTabNavigationPresenter';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

const PDFTabNavigation = (props: Props) => {
  const { setSelectedTab, selectedTab } = props;
  const horizontalScroll = useRef<HTMLDivElement>(null);

  const { disableScroll, enableScroll, position } =
    usePreventBodyScroll(horizontalScroll);

  return (
    <PDFTabNavigationPresenter
      disableScroll={disableScroll}
      enableScroll={enableScroll}
      position={position}
      horizontalScroll={horizontalScroll}
      setSelectedTab={setSelectedTab}
      selectedTab={selectedTab}
    />
  );
};

export default PDFTabNavigation;
