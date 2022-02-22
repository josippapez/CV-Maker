import { RefObject } from 'react';
import { scrollPosition } from '../../../Hooks/usePreventBodyScroll';
import { Tab } from '../PDFInputs/PDFInputsContainer';
import './PDFTabNavigationPresenter.css';
declare type Props = {
    position: scrollPosition | null;
    disableScroll: () => void;
    enableScroll: () => void;
    setSelectedTab: (tab: Tab) => void;
    selectedTab: Tab;
    horizontalScroll: RefObject<HTMLDivElement>;
};
declare const PDFTabNavigationPresenter: (props: Props) => JSX.Element;
export default PDFTabNavigationPresenter;
