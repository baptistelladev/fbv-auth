import { Metadata } from "next";

// META TAGS
export const metadata: Metadata = {
  title: "Esqueci minha senha | Enviaremos um e-amil para recuperação",
};

// PÁGINA
export default function EsqueciMinhaSenhaPage() {
  return (
    <section className="esqueci-minha-senha-page-wrapper">
      <p>Esqueci minha senha</p>
    </section>
  );
}
