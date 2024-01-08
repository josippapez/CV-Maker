import { View } from '@rawwee/react-pdf-html';
import { StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  Component1: React.JSX.Element | null;
  Component2: React.JSX.Element | null;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export const SplitView: FC<Props> = ({ Component1, Component2 }) => {
  return (
    <View wrap={false} style={[styles.row, { flexGrow: 1, flexShrink: 0 }]}>
      {Component1 && (
        <View
          style={{
            width: Component2 ? '50%' : '100%',
            paddingLeft: 20,
            backgroundColor: '#fcfcfc',
            color: 'black',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {Component1}
        </View>
      )}
      {Component2 && (
        <View
          style={{
            width: Component1 ? '50%' : '100%',
            paddingRight: 20,
            backgroundColor: '#f7f7f7',
            color: 'black',
          }}
        >
          {Component2}
        </View>
      )}
    </View>
  );
};
