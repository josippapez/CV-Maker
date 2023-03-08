interface Props {
  amountX?: number;
  amountY?: number;
  combinedTransition?: {
    type?: 'spring' | 'tween' | 'keyframes' | 'inertia' | 'just';
    duration: number;
    delay?: number;
  };
}

export const useAnimation = (props: Props) => {
  const { amountX, amountY, combinedTransition } = props;

  const fadeStyleInitial = {
    opacity: 0,
  };

  const fadeStyleFinal = {
    opacity: 1,
  };

  const slideStyleInitial = {
    y: amountY ?? 0,
    x: amountX ?? 0,
  };

  const slideStyleFinal = {
    y: 0,
    x: 0,
  };

  const slideStyleInitialReverse = {
    y: amountY ? -amountY : 0,
    x: amountX ? -amountX : 0,
  };

  return {
    fadeStyleInitial,
    fadeStyleFinal,
    slideStyleInitial,
    slideStyleFinal,
    combinedStyleInitial: {
      ...fadeStyleInitial,
      ...slideStyleInitial,
    },
    combinedStyleFinal: {
      ...fadeStyleFinal,
      ...slideStyleFinal,
    },
    combinedStyleInitialReverse: {
      ...fadeStyleInitial,
      ...slideStyleInitialReverse,
    },
    combinedStyleFinalReverse: {
      ...fadeStyleInitial,
      ...slideStyleFinal,
    },
  };
};
