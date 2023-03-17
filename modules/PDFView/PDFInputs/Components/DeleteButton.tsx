import DeleteIcon from '@public/Styles/Assets/Images/deleteIcon.svg';

type Props = {
  onClick: () => void;
  positionTop?: number;
  positionRight?: number;
  color?: string;
  colorHover?: string;
};

export const DeleteButton = (props: Props) => {
  const { onClick, color, colorHover, positionRight, positionTop } = props;

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

DeleteButton.defaultProps = {
  positionTop: '1rem',
  positionRight: '1rem',
  color: 'gray',
  colorHover: 'hover:stroke-red-600',
};
