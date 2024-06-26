import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: "white",
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
};

export const generateSeo = (metadata: Partial<Metadata>): Metadata => {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots ?? "index, follow",
    metadataBase: metadata.metadataBase,
    alternates: metadata.alternates,
    twitter: {
      ...metadata.twitter,
      title: metadata.title ?? metadata.twitter?.title,
      description: metadata.description ?? metadata.twitter?.description,
    },
    verification: metadata.verification,
    openGraph: {
      ...metadata.openGraph,
      title: metadata.title ?? metadata.openGraph?.title,
      description: metadata.description ?? metadata.openGraph?.description,
    },
  } satisfies Metadata;
};
