import { ReactComponent as DeleteIcon } from '../../../../Styles/Assets/Images/deleteIcon.svg';

type Props = {
  onClick: () => void;
};

export const DeleteButton = (props: Props) => {
  const { onClick } = props;
  return (
    <button className='absolute top-4 right-4' onClick={onClick}>
      <DeleteIcon className='hover:stroke-red-600' width={30} height={30} />
    </button>
  );
};
