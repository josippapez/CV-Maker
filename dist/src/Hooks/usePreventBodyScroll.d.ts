import React from 'react';
export declare enum scrollPosition {
    left = "left",
    right = "right",
    inbetween = "inbetween"
}
declare function usePreventBodyScroll(ref: React.RefObject<HTMLElement>): {
    disableScroll: () => void;
    enableScroll: () => void;
    position: scrollPosition | null;
};
export default usePreventBodyScroll;
