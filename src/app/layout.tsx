import type { Metadata } from "next";
import "@/styles/index.scss"

export const metadata: Metadata = {
  title: "tudoaqui",
  description: "Tudo que você precisa, todos os seus links, tudo aqui.”",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
