import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

type AppRoutePath =
  | "/"
  | "/about"
  | "/careers"
  | "/contact"
  | "/privacy"
  | "/products"
  | "/terms"
  | "/services/app"
  | "/services/maintenance"
  | "/services/social-sphere"
  | "/services/web";

export function CTASection({
  title,
  description,
  ctaLabel = "Get In Touch",
  ctaTo = "/contact",
}: {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: AppRoutePath;
}) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto rounded-3xl bg-foreground text-background p-12 md:p-16 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-3 text-background/70 max-w-2xl mx-auto">{description}</p>
          )}
          <Link
            to={ctaTo}
            className="mt-8 inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
