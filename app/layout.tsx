import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'No Waste App',
  description: 'Plataforma para reduzir desperdício e integrar com backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
