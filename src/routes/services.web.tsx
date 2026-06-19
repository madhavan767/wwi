import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CTASection } from "../components/CTASection";
import { Code2, Palette, Zap, Globe, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/web")({
  head: () => ({
    meta: [
      { title: "Web Services | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "High-end web development using React, Node.js, Python and TypeScript. Modern, fast, SEO-optimized.",
      },
      { property: "og:title", content: "Web Services | Work Wizards Innovations" },
      {
        property: "og:description",
        content: "We craft exceptional web experiences using cutting-edge web technologies.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/web" }],
  }),
  component: WebPage,
});

const tech = [
  ["React.js", "Modern UI library for dynamic interfaces"],
  ["Node.js", "Server-side JavaScript runtime"],
  ["Express.js", "Fast, minimalist web framework"],
  ["Python", "Versatile backend programming"],
  ["Tailwind CSS", "Utility-first CSS framework"],
  ["TypeScript", "Type-safe JavaScript"],
];

const deliver = [
  {
    icon: Code2,
    title: "Clean Code Architecture",
    desc: "Well-structured, maintainable code following industry best practices",
  },
  {
    icon: Palette,
    title: "Modern Design",
    desc: "Beautiful, responsive designs that work flawlessly on all devices",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized performance for exceptional user experience",
  },
  { icon: Globe, title: "SEO Optimized", desc: "Built with search engine optimization in mind" },
];

const process = [
  ["Discovery", "We understand your business goals and target audience"],
  ["Design", "Create stunning mockups and prototypes"],
  ["Development", "Build with high-end frameworks and technologies"],
  ["Testing", "Rigorous quality assurance and testing"],
  ["Launch", "Deploy and monitor your web application"],
  ["Support", "Ongoing maintenance and updates"],
];

function WebPage() {
  return (
    <>
      <PageHero
        title="Web Services"
        description="We craft exceptional web experiences using cutting-edge technologies and frameworks. From concept to deployment, we deliver high-performance web solutions tailored to your business needs."
      />

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">High-End Technologies</h2>
            <p className="mt-3 text-muted-foreground">
              We leverage the most powerful and modern frameworks to build robust, scalable web
              applications
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tech.map(([name, desc], i) => (
              <Reveal key={name} delay={i * 0.04}>
                <div className="p-6 rounded-2xl bg-card border border-border h-full">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground" /> {name}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What We Deliver</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {deliver.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.05}>
                <div className="flex gap-4 p-6 rounded-2xl bg-background border border-border h-full">
                  <div className="w-11 h-11 grid place-items-center rounded-xl bg-foreground text-background shrink-0">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Development Process</h2>
            <p className="mt-3 text-muted-foreground">
              A proven methodology that ensures quality and timely delivery
            </p>
          </Reveal>
          <div className="space-y-3">
            {process.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="flex items-center gap-5 p-5 rounded-2xl bg-card border border-border">
                  <div className="w-10 h-10 grid place-items-center rounded-full bg-foreground text-background text-sm font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Build Your Web Presence?"
        description="Let's create something amazing together with cutting-edge technology"
      />
      <div className="hidden">
        <Link to="/contact">contact</Link>
      </div>
    </>
  );
}
