'use client';

import { Settings } from 'luxon';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  locale: string;
}

export const DateTimeProvider: React.FC<Props> = ({ locale, children }) => {
  Settings.defaultLocale = locale;

  return <>{children}</>;
};
