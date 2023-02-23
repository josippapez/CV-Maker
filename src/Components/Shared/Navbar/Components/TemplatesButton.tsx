import  TemplatesIcon from '@public/Styles/Assets/Images/template.svg';

type Props = {
  iconClassname?: string;
  className?: string;
  onClick?: () => void;
};

const TemplatesButton = (props: Props) => {
  const { className, iconClassname, onClick } = props;
  return (
    <button className={`${className}`} type='button' onClick={onClick}>
      <TemplatesIcon
        height={30}
        width={35}
        className={`${iconClassname}`}
      />
    </button>
  );
};

export default TemplatesButton;
