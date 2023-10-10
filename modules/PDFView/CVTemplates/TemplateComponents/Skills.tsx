import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { View } from '@rawwee/react-pdf-html';
import { Skill } from '@modules/PDFView/models';
import { StyleSheet } from '@react-pdf/renderer';
import { FC } from 'react';

type Props = {
  styles: ReturnType<typeof StyleSheet.create>;
  skills?: Skill[];
};

const skillsStyles = StyleSheet.create({
  skill: {
    width: 'auto',
    height: 'auto',
    margin: '0 10px 10px 0',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    padding: '5px 15px',
    borderColor: '#333333',
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'white',
  },
});

export const Skills: FC<Props> = ({ styles, skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <View
      style={[
        styles.row,
        styles.marginTop10,
        {
          flexWrap: 'wrap',
        },
      ]}
    >
      {skills.map((skill: Skill, index: number) => {
        return (
          <View key={index} style={[skillsStyles.skill]}>
            <TextDisplay style={[skillsStyles.skillText]}>
              {skill.name}
            </TextDisplay>
          </View>
        );
      })}
    </View>
  );
};
