import type { ReactNode } from 'react';

export const metadata = {
  title: 'No Bed Syndrome Tracker', // This replaces "localhost:3000"
  description: 'Real-time Hospital Bed Management System',
  icons: {
    icon: '/favicon.ico', // Reference to your icon
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}