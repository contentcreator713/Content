import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Still Here — A blog about mental health & keeping going",
  description:
    "A blog about anxiety, depression, loneliness, and the slow, messy work of figuring out how to keep going anyway. No advice columns. Just honest writing.",
  openGraph: {
    title: "Still Here",
    description:
      "Raw, honest writing about mental health and daily life — from someone still in the middle of it.",
    type: "website",
  },
};

export default function StillHereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Open+Sans:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
