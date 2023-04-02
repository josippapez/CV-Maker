type Props = {
  title: string;
  onClick: () => void;
  hidden?: boolean;
};

export const AddNewButton = (props: Props) => {
  const { title, onClick, hidden } = props;
  return (
    <button
      className={`mt-4 h-10 w-full rounded-md border-2 p-1 focus:border-slate-400 ${
        hidden ? 'hidden' : ''
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
