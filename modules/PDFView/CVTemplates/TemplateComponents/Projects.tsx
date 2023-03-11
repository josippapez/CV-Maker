import { TextDisplay } from '@modules/PDFView/CVTemplates/TemplateComponents/TextDisplay';
import { ComponentProps } from '@modules/PDFView/CVTemplates/TemplateComponents/models/ComponentProps';
import { displayDate } from '@modules/PDFView/CVTemplates/Templates/Utils';
import { Project } from '@modules/PDFView/models';
import { StyleSheet, View } from '@react-pdf/renderer';
import { TFunction } from 'next-i18next';
import { FC } from 'react';

interface Props extends ComponentProps {
  defaultStyles: ReturnType<typeof StyleSheet.create>;
  projects?: Project[];
  translate: TFunction;
}

const projectStyles = StyleSheet.create({
  projectWrapper: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
  },
});

export const Projects: FC<Props> = ({
  defaultStyles,
  projects,
  translate,
  backgroundColor,
  color,
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <View
      wrap={false}
      style={[
        projectStyles.projectWrapper,
        defaultStyles.paddingY20,
        defaultStyles.paddingX40,
        {
          color,
          backgroundColor,
        },
      ]}
    >
      <TextDisplay style={[defaultStyles.sectionTitle]}>
        {translate('projects')}
      </TextDisplay>
      {projects?.map((project, index) => (
        <View
          key={index}
          style={[
            defaultStyles.paddingY10,
            {
              flexDirection: 'row',
            },
          ]}
        >
          <View style={[defaultStyles.column, { width: '50%' }]}>
            <TextDisplay style={[defaultStyles.name]}>
              {project.name}
            </TextDisplay>
            <TextDisplay style={[defaultStyles.duration]}>
              {project.startDate && displayDate(project.startDate)} -{' '}
              {project.currentlyWorking
                ? translate('present')
                : project.endDate && displayDate(project.endDate)}
            </TextDisplay>
            <TextDisplay style={[defaultStyles.location]}>
              {project.url}
            </TextDisplay>
          </View>
          <View
            style={[
              defaultStyles.column,
              defaultStyles.paddingX20,
              { width: '50%' },
            ]}
          >
            <TextDisplay>{project.description}</TextDisplay>
          </View>
        </View>
      ))}
    </View>
  );
};
