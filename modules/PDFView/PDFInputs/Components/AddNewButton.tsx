type Props = {
  title: string;
  onClick: () => void;
};

export const AddNewButton = (props: Props) => {
  const { title, onClick } = props;
  return (
    <button
      className='mt-4 w-full rounded-md border-2 p-1 focus:border-slate-400'
      onClick={onClick}
    >
      {title}
    </button>
  );
};
