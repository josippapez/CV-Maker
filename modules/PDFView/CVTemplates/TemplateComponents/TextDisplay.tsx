import { Text } from '@modules/PDFView/CVTemplates/Templates/Components';
import { Style } from '@react-pdf/types';

type Props = {
  style?: Style | Style[];
  children?: React.ReactNode;
};

export const TextDisplay = (props: Props) => {
  const { style, children } = props;

  return children && children !== '' && children !== ' ' ? (
    <Text style={style}>{children}</Text>
  ) : null;
};
