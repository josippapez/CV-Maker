import { Text } from '@modules/PDFView/CVTemplates/Templates/Components';
import { Style } from '@react-pdf/types';

type Props = {
  style?: Style | Style[];
  children?: React.ReactNode;
  debug?: boolean;
};

export const TextDisplay = (props: Props) => {
  const { style, children, debug } = props;

  return children && children !== '' && children !== ' ' ? (
    <Text style={style} debug={debug}>
      {children}
    </Text>
  ) : null;
};
