import type { Metadata } from "next";
import "@/assets/css/globals.css";

export const metadata: Metadata = {
  title: "Gerenciador de tarefas",
  description: "Este app é um teste técnico para a vaga de desenvolvedor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <div className="container-wrapper py-6">
          <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow container m-[0_auto]">
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
