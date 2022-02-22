import { Tab } from '../PDFInputs/PDFInputsContainer';
declare type Props = {
    setSelectedTab: (tab: Tab) => void;
    selectedTab: Tab;
};
declare const PDFTabNavigation: (props: Props) => JSX.Element;
export default PDFTabNavigation;
