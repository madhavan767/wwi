import { BackButton } from "./BackButton";
import { Reveal } from "./Reveal";

export function PageHero({
  title,
  description,
  kicker,
}: {
  title: string;
  description?: string;
  kicker?: string;
}) {
  return (
    <section className="pt-28 pb-12 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <BackButton />
        </div>
        <Reveal>
          {kicker && (
            <div className="inline-flex items-center text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1 mb-4">
              {kicker}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
