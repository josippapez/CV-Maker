import type { Metadata } from 'next';

export const generateSeo = (metadata: Partial<Metadata>): Metadata => {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots ?? 'index, follow',
    metadataBase: metadata.metadataBase,
    alternates: metadata.alternates,
    twitter: {
      ...metadata.twitter,
      title: metadata.title ?? metadata.twitter?.title,
      description: metadata.description ?? metadata.twitter?.description,
    },
    verification: metadata.verification,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    openGraph: {
      ...metadata.openGraph,
      title: metadata.title ?? metadata.openGraph?.title,
      description: metadata.description ?? metadata.openGraph?.description,
    },
  };
};
