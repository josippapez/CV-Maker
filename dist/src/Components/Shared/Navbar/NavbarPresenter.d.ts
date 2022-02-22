declare type Props = {
    darkTheme: {
        toggle(): void;
        enabled: string | null;
    };
    pathname: string;
};
declare const NavbarPresenter: (props: Props) => JSX.Element;
export default NavbarPresenter;
