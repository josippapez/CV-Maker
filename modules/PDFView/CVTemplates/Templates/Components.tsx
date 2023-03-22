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
  Page,
  Path,
  Rect,
  Stop,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { FC } from 'react';

const getCacheIsHtml = () => {
  const cache = sessionStorage.getItem('cvIsHTML');
  console.log(cache);

  if ((cache && cache === 'true') || cache === null) return true;
  return false;
};

const isHtml = getCacheIsHtml();

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
      mergedStyle[key] = style[key];
    });
  });
  return mergedStyle;
};

export const CustomView: FC<PropsView> = ({
  children,
  style,
  ...rest
}): any => {
  // console.log(isHtml);

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

export const CustomText: FC<PropsText> = ({
  children,
  style,
  ...rest
}): any => {
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

export const CustomImage: FC<PropsImage> = ({ style, ...rest }): any => {
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

export const CustomPage: FC<PropsPage> = ({
  style,
  children,
  ...rest
}): any => {
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

export const CustomLink: FC<PropsLink> = ({
  children,
  style,
  ...rest
}): any => {
  if (isHtml) {
    let newStyle = style;
    if (Array.isArray(style)) {
      newStyle = mergeStylesIntoOne(style) as {
        [key: string]: string;
      };
    }
    adjustStyles(newStyle as { [key: string]: string });
    return (
      <a {...rest} target='_blank' rel='noopener noreferrer'>
        <div style={newStyle as { [key: string]: string }}>{children}</div>
      </a>
    );
  }
  return <Text {...rest}>{children}</Text>;
};

export const CustomG: FC<PropsG> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <g {...rest}>{children}</g>;
  }
  return <G {...rest}>{children}</G>;
};

export const CustomPath: FC<PropsPath> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <path {...rest}>{children}</path>;
  }
  return <Path {...rest}>{children}</Path>;
};

export const CustomRect: FC<PropsRect> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <rect {...rest}>{children}</rect>;
  }
  return <Rect {...rest}>{children}</Rect>;
};

export const CustomSVG: FC<PropsSVG> = ({ children, ...rest }): any => {
  rest.style = {
    ...rest.style,
    left: 0,
    right: 0,
  };

  if (isHtml) {
    return (
      <svg
        {...rest}
        style={{
          ...(rest.style as { [key: string]: string }),
        }}
      >
        {children}
      </svg>
    );
  }
  return <Svg {...rest}>{children}</Svg>;
};

export const CustomDefs: FC<PropsDefs> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <defs {...rest}>{children}</defs>;
  }
  return <Defs {...rest}>{children}</Defs>;
};

export const CustomLine: FC<PropsLine> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <line {...rest}>{children}</line>;
  }
  return <Line {...rest}>{children}</Line>;
};

export const CustomStop: FC<PropsStop> = ({ children, ...rest }): any => {
  if (isHtml) {
    return <stop {...rest}>{children}</stop>;
  }
  return <Stop {...rest}>{children}</Stop>;
};

export const CustomLinearGradient: FC<PropsLinearGradient> = ({
  children,
  ...rest
}): any => {
  if (isHtml) {
    return <linearGradient {...rest}>{children}</linearGradient>;
  }
  return <LinearGradient {...rest}>{children}</LinearGradient>;
};

export const CustomDocument: FC<PropsDocument> = ({
  children,
  ...rest
}): any => {
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
