/// <reference types="react" />
declare type Props = {
    landingPageSections: {
        (): React.ReactNode;
    }[];
};
declare const LandingPageSections: (props: Props) => JSX.Element;
export default LandingPageSections;
