export const getAnimation = (animation?: string) => {
  const transition = {
    duration: 0.15,
  };
  switch (animation) {
    case 'slide-left':
      return {
        show: {
          x: 0,
          transition,
        },
        hide: {
          x: '-100%',
          transition,
        },
      };
    case 'slide-right':
      return {
        show: {
          x: 0,
          transition,
        },
        hide: {
          x: '100%',
          transition,
        },
      };
    case 'slide-top':
      return {
        show: {
          y: 0,
          transition,
        },
        hide: {
          y: '-100%',
          transition,
        },
      };
    case 'slide-bottom':
      return {
        show: {
          y: 0,
          transition,
        },
        hide: {
          y: '100%',
          transition,
        },
      };
    case 'fade':
      return {
        show: {
          opacity: 1,
          transition,
        },
        hide: {
          opacity: 0,
          transition,
        },
      };
    default:
      return {
        show: {
          opacity: 1,
          transform: 'scale(1)',
          transition,
        },
        hide: {
          transform: 'scale(0.95)',
          opacity: 0,
          transition,
        },
      };
  }
};
