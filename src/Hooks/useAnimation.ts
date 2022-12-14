interface Props {
  amountX?: number;
  amountY?: number;
}

const useAnimation = (props: Props) => {
  const { amountX, amountY } = props;

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
  };
};

export default useAnimation;
