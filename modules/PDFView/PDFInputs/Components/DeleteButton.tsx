import DeleteIcon from '@public/Styles/Assets/Images/deleteIcon.svg';

type Props = {
  onClick: () => void;
  positionTop?: number;
  positionRight?: number;
  color?: string;
  colorHover?: string;
};

export const DeleteButton: React.FC<Props> = ({
  onClick,
  color = 'gray',
  colorHover = 'hover:stroke-red-600',
  positionRight = '1rem',
  positionTop = '1rem',
}) => {
  return (
    <button
      type='button'
      className='absolute z-10'
      style={{
        top: positionTop,
        right: positionRight,
      }}
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
