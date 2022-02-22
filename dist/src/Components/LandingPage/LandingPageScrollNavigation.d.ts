/// <reference types="react" />
declare type Props = {
    landingPageSections: {
        (): React.ReactNode;
    }[];
};
declare const LandingPageScrollNavigation: (props: Props) => JSX.Element;
export default LandingPageScrollNavigation;
