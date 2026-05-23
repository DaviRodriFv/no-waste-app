import Link from 'next/link';
import { getWelcomeMessage } from '../services/api';

export default async function Home() {
  const welcomeMessage = await getWelcomeMessage();

  return (
    <main className="page-shell">
      <section className="hero-section">
        <h1>No Waste App</h1>
        <p>{welcomeMessage}</p>
        <div className="button-row">
          <Link href="/about" className="button">
            Sobre o projeto
          </Link>
        </div>
      </section>
    </main>
  );
}
