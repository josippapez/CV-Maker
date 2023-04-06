import { Path, Svg } from '@modules/PDFView/CVTemplates/Templates/Components';

export const LayeredWaves = ({
  height,
  width,
}: {
  height?: number | string;
  width?: number | string;
}) => {
  return (
    <Svg id='visual' viewBox='0 0 595 100' width={width} height={height}>
      <Path
        d='M0 59L14.2 59.2C28.3 59.3 56.7 59.7 85 62C113.3 64.3 141.7 68.7 170 68.8C198.3 69 226.7 65 255 64.7C283.3 64.3 311.7 67.7 340 67.5C368.3 67.3 396.7 63.7 425 63.2C453.3 62.7 481.7 65.3 510 65C538.3 64.7 566.7 61.3 580.8 59.7L595 58L595 101L580.8 101C566.7 101 538.3 101 510 101C481.7 101 453.3 101 425 101C396.7 101 368.3 101 340 101C311.7 101 283.3 101 255 101C226.7 101 198.3 101 170 101C141.7 101 113.3 101 85 101C56.7 101 28.3 101 14.2 101L0 101Z'
        fill='#13171a'
      ></Path>
      <Path
        d='M0 73L14.2 71.7C28.3 70.3 56.7 67.7 85 67.7C113.3 67.7 141.7 70.3 170 71.7C198.3 73 226.7 73 255 72C283.3 71 311.7 69 340 68.3C368.3 67.7 396.7 68.3 425 68.8C453.3 69.3 481.7 69.7 510 69.5C538.3 69.3 566.7 68.7 580.8 68.3L595 68L595 101L580.8 101C566.7 101 538.3 101 510 101C481.7 101 453.3 101 425 101C396.7 101 368.3 101 340 101C311.7 101 283.3 101 255 101C226.7 101 198.3 101 170 101C141.7 101 113.3 101 85 101C56.7 101 28.3 101 14.2 101L0 101Z'
        fill='#2d3032'
      ></Path>
      <Path
        d='M0 84L14.2 83.5C28.3 83 56.7 82 85 80.8C113.3 79.7 141.7 78.3 170 78.2C198.3 78 226.7 79 255 80C283.3 81 311.7 82 340 81.8C368.3 81.7 396.7 80.3 425 78.7C453.3 77 481.7 75 510 73.8C538.3 72.7 566.7 72.3 580.8 72.2L595 72L595 101L580.8 101C566.7 101 538.3 101 510 101C481.7 101 453.3 101 425 101C396.7 101 368.3 101 340 101C311.7 101 283.3 101 255 101C226.7 101 198.3 101 170 101C141.7 101 113.3 101 85 101C56.7 101 28.3 101 14.2 101L0 101Z'
        fill='#494b4d'
      ></Path>
      <Path
        d='M0 86L14.2 85.7C28.3 85.3 56.7 84.7 85 85.2C113.3 85.7 141.7 87.3 170 87C198.3 86.7 226.7 84.3 255 82.7C283.3 81 311.7 80 340 79.8C368.3 79.7 396.7 80.3 425 80.8C453.3 81.3 481.7 81.7 510 81.8C538.3 82 566.7 82 580.8 82L595 82L595 101L580.8 101C566.7 101 538.3 101 510 101C481.7 101 453.3 101 425 101C396.7 101 368.3 101 340 101C311.7 101 283.3 101 255 101C226.7 101 198.3 101 170 101C141.7 101 113.3 101 85 101C56.7 101 28.3 101 14.2 101L0 101Z'
        fill='#868686'
      ></Path>
      <Path
        d='M0 91L14.2 91C28.3 91 56.7 91 85 91C113.3 91 141.7 91 170 91.3C198.3 91.7 226.7 92.3 255 92C283.3 91.7 311.7 90.3 340 89.5C368.3 88.7 396.7 88.3 425 88.5C453.3 88.7 481.7 89.3 510 90.2C538.3 91 566.7 92 580.8 92.5L595 93L595 101L580.8 101C566.7 101 538.3 101 510 101C481.7 101 453.3 101 425 101C396.7 101 368.3 101 340 101C311.7 101 283.3 101 255 101C226.7 101 198.3 101 170 101C141.7 101 113.3 101 85 101C56.7 101 28.3 101 14.2 101L0 101Z'
        fill='#535353'
      ></Path>
    </Svg>
  );
};
