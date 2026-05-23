import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <h1>Sobre No Waste App</h1>
        <p>
          Este projeto está estruturado em Next.js com pastas para app, hooks,
          services e components. Ele já está pronto para conectar ao backend.
        </p>
        <div className="button-row">
          <Link href="/" className="button">
            Voltar para início
          </Link>
        </div>
      </section>
    </main>
  );
}
