import { cn } from '@/lib/utils';
import DeleteIcon from '@public/Styles/Assets/Images/deleteIcon.svg';

type Props = {
  onClick: () => void;
  className?: string;
  color?: string;
  colorHover?: string;
};

export const DeleteButton: React.FC<Props> = ({
  onClick,
  color = 'gray',
  colorHover = 'hover:stroke-red-600',
  className,
}) => {
  return (
    <button
      type='button'
      className={cn('absolute z-10', className)}
      onClick={onClick}
    >
      <DeleteIcon
        className={`${colorHover}`}
        stroke={color}
        width={30}
        height={30}
      />
    </button>
  );
};
