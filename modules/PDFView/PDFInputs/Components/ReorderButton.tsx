import Dots from '@public/Styles/Assets/Images/Dots.svg';
import { DragControls } from 'framer-motion';
import { FC } from 'react';

type Props = {
  controls: DragControls;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReorderButton: FC<Props> = ({ controls, setIsDragging }) => {
  return (
    <button
      type='button'
      className='absolute top-2 left-2 z-10 cursor-grab'
      onPointerDown={e => {
        controls.start(e);
        setIsDragging(true);
      }}
      onMouseUp={() => {
        setIsDragging(false);
      }}
      onPointerUp={() => {
        setIsDragging(false);
      }}
    >
      <Dots height={28} width={28} fill={'#808080'} />
    </button>
  );
};
