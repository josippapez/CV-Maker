/// <reference types="react" />
import PropTypes from 'prop-types';
interface Props {
    closeModal(): void;
    position?: 'center' | 'left' | 'right';
    children: JSX.Element;
    show: boolean;
    height?: string;
    width?: string;
}
declare const Modal: {
    (props: Props): JSX.Element;
    defaultProps: {
        position: string;
        height: string;
        width: string;
        closeModal: () => void;
    };
    propTypes: {
        closeModal: PropTypes.Requireable<(...args: any[]) => any>;
        position: PropTypes.Requireable<string>;
        children: PropTypes.Validator<PropTypes.InferProps<{}>>;
    };
};
export default Modal;
