import { cn } from '@/lib/utils';
import XImage from '@public/Styles/Assets/Images/X.svg';
import { FC } from 'react';

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
      className={cn(
        'flex hover:cursor-pointer',
        align === 'left' && 'self-start',
        align === 'right' && 'self-end',
        align === 'center' && 'self-center',
        buttonClassName
      )}
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
