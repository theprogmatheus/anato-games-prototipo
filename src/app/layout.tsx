import "./globals.css";

export const metadata = {
  title: 'AnatoMatch',
  description: 'Jogo da Memória de Anatomia para Estudantes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
