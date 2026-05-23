type SectionCardProps = {
  title: string;
  description: string;
};

export function SectionCard({ title, description }: SectionCardProps) {
  return (
    <article className="section-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}
