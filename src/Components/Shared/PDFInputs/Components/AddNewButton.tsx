type Props = {
  title: string;
  onClick: () => void;
};

export const AddNewButton = (props: Props) => {
  const { title, onClick } = props;
  return (
    <button
      className='w-full border-2 rounded-md p-1 focus:border-slate-400 mt-4'
      onClick={onClick}
    >
      {title}
    </button>
  );
};
