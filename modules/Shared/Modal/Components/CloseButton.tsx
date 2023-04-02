import XImage from '@public/Styles/Assets/Images/X.svg';
import { FC } from 'react';
import style from '../Modal.module.scss';

type Props = {
  onClick: () => void;
  align?: 'left' | 'right' | 'center';
  color?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  buttonClassName?: string;
};

export const CloseButton: FC<Props> = ({
  width = 24,
  height = 24,
  onClick,
  align,
  color = '#000',
  imageClassName,
  buttonClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${style.closeButton} ${align} ${buttonClassName}`}
    >
      <XImage
        height={height}
        width={width}
        fill={color}
        className={imageClassName}
      />
    </button>
  );
};
