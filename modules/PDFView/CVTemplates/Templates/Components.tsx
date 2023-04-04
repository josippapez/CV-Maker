import {
  PropsDefs,
  PropsDocument,
  PropsG,
  PropsImage,
  PropsLine,
  PropsLinearGradient,
  PropsLink,
  PropsPage,
  PropsPath,
  PropsRect,
  PropsSVG,
  PropsStop,
  PropsText,
  PropsView,
} from '@modules/PDFView/CVTemplates/Templates/Types';
import {
  Defs,
  Document,
  G,
  Image,
  Line,
  LinearGradient,
  Link,
  Page,
  Path,
  Rect,
  Stop,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { FC, useState } from 'react';

let isHtml = true;

export const usePDFComponentsAreHTML = () => {
  const [html, setHtml] = useState(isHtml);

  isHtml = html;

  return {
    isHTML: html,
    setHtml,
  };
};

const adjustStyles = (style: Style) => {
  if (!style) return;

  Object.keys(style).forEach(key => {
    if (key === 'paddingVertical') {
      style.paddingTop = style[key];
      style.paddingBottom = style[key];
    } else if (key === 'paddingHorizontal') {
      style.paddingLeft = style[key];
      style.paddingRight = style[key];
    }
  });
};
const mergeStylesIntoOne = (styles: Style[]) => {
  const mergedStyle: Style = {};

  if (!styles[0]) return mergedStyle;

  styles.forEach(style => {
    Object.keys(style).forEach(key => {
      mergedStyle[key as keyof Style] = style[key as keyof Style];
    });
  });
  return mergedStyle;
};

export const CustomView: FC<PropsView> = ({ children, style, ...rest }) => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }

    adjustStyles(newStyle as { [key: string]: string });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          isolation: 'isolate',
          left: 0,
          right: 0,
          ...(newStyle as { [key: string]: string }),
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
};

export const CustomText: FC<PropsText> = ({ children, style, ...rest }) => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }
    adjustStyles(newStyle as { [key: string]: string });
    return (
      <div
        style={{
          whiteSpace: 'break-spaces',
          position: 'relative',
          ...(newStyle as { [key: string]: string }),
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <Text style={style} {...rest}>
      {children}
    </Text>
  );
};

export const CustomImage: FC<PropsImage> = ({ style, ...rest }) => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }
    adjustStyles(newStyle as { [key: string]: string });
    return (
      <img
        style={newStyle as { [key: string]: string }}
        src={rest.src as string}
      />
    );
  }
  return <Image style={style} {...rest} />;
};

export const CustomPage: FC<PropsPage> = ({ style, children, ...rest }) => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }
    adjustStyles(newStyle as { [key: string]: string });
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          isolation: 'isolate',
          ...(newStyle as { [key: string]: string }),
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <Page style={style} {...rest}>
      {children}
    </Page>
  );
};

export const CustomLink: FC<PropsLink> = ({ children, style, ...rest }) => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }
    adjustStyles(newStyle as { [key: string]: string });
    return (
      <a {...rest} href={rest.src} target='_blank' rel='noopener noreferrer'>
        <div style={newStyle as { [key: string]: string }}>{children}</div>
      </a>
    );
  }
  return (
    <Link {...rest} style={style}>
      {children}
    </Link>
  );
};

export const CustomG: FC<PropsG> = ({ children, ...rest }) => {
  if (isHtml) {
    return <g {...rest}>{children}</g>;
  }
  return <G {...rest}>{children}</G>;
};

export const CustomPath: FC<PropsPath> = ({ children, ...rest }) => {
  if (isHtml) {
    return <path {...rest}>{children}</path>;
  }
  return <Path {...rest}>{children}</Path>;
};

export const CustomRect: FC<PropsRect> = ({ children, ...rest }) => {
  if (isHtml) {
    return <rect {...rest}>{children}</rect>;
  }
  return <Rect {...rest}>{children}</Rect>;
};

export const CustomSVG: FC<PropsSVG> = ({ children, ...rest }) => {
  if (isHtml) {
    const style = {
      ...rest.style,
      left: 0,
      right: 0,
    };
    return (
      <svg
        {...rest}
        style={{
          ...(style as { [key: string]: string | number }),
        }}
      >
        {children}
      </svg>
    );
  }
  return <Svg {...rest}>{children}</Svg>;
};

export const CustomDefs: FC<PropsDefs> = ({ children, ...rest }) => {
  if (isHtml) {
    return <defs {...rest}>{children}</defs>;
  }
  return <Defs {...rest}>{children}</Defs>;
};

export const CustomLine: FC<PropsLine> = ({ children, ...rest }) => {
  if (isHtml) {
    return <line {...rest}>{children}</line>;
  }
  return <Line {...rest}>{children}</Line>;
};

export const CustomStop: FC<PropsStop> = ({ children, ...rest }) => {
  if (isHtml) {
    return <stop {...rest}>{children}</stop>;
  }
  return <Stop {...rest}>{children}</Stop>;
};

export const CustomLinearGradient: FC<PropsLinearGradient> = ({
  children,
  ...rest
}) => {
  if (isHtml) {
    return <linearGradient {...rest}>{children}</linearGradient>;
  }
  return <LinearGradient {...rest}>{children}</LinearGradient>;
};

export const CustomDocument: FC<PropsDocument> = ({ children, ...rest }) => {
  if (isHtml) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          isolation: 'isolate',
          left: 0,
          right: 0,
        }}
      >
        {children}
      </div>
    );
  }
  return <Document {...rest}>{children}</Document>;
};

export {
  CustomDefs as Defs,
  CustomDocument as Document,
  CustomG as G,
  CustomImage as Image,
  CustomLine as Line,
  CustomLinearGradient as LinearGradient,
  CustomLink as Link,
  CustomPage as Page,
  CustomPath as Path,
  CustomRect as Rect,
  CustomStop as Stop,
  CustomSVG as Svg,
  CustomText as Text,
  CustomView as View,
};
