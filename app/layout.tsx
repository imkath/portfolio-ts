import type React from "react";

/**
 * Root layout - Required by Next.js
 * This is a minimal wrapper; actual HTML/body tags are in each route group
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
