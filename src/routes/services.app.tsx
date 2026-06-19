import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CTASection } from "../components/CTASection";
import { Smartphone, Cpu, Layers, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/app")({
  head: () => ({
    meta: [
      { title: "App Development | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "Native Android, iOS and cross-platform mobile apps engineered for performance and scale.",
      },
      { property: "og:title", content: "App Development | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "We craft mobile apps for Android and iOS that deliver exceptional performance and user experience.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/app" }],
  }),
  component: AppPage,
});

const platforms = [
  { title: "Native Android", desc: "Java & Kotlin for optimal Android performance" },
  { title: "Native iOS", desc: "Swift for seamless iPhone and iPad experiences" },
  { title: "Cross-Platform", desc: "React Native & Flutter for multi-platform deployment" },
];

const features = [
  {
    icon: Smartphone,
    title: "Native Performance",
    desc: "Optimized for speed and responsiveness on every device",
  },
  {
    icon: Layers,
    title: "Adaptive Design",
    desc: "Beautiful interfaces that adapt to any screen size",
  },
  { icon: Cpu, title: "Scalable Architecture", desc: "Built to grow with your user base" },
  {
    icon: Zap,
    title: "Offline Capability",
    desc: "Work seamlessly even without internet connection",
  },
];

const apps = [
  [
    "Business Applications",
    "Enterprise-grade apps for internal operations, CRM, inventory management, and workflow automation",
    ["Employee Management", "Sales Tracking", "Inventory Systems"],
  ],
  [
    "Consumer Applications",
    "Engaging apps for end-users with focus on user experience and performance",
    ["E-commerce Apps", "Social Platforms", "Entertainment Apps"],
  ],
  [
    "Educational Applications",
    "Learning platforms and educational tools for students and institutions",
    ["E-learning Platforms", "Course Management", "Study Tools"],
  ],
] as const;

const stack = [
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Java",
  "Firebase",
  "GraphQL",
  "REST APIs",
  "SQLite",
  "Realm",
];

function AppPage() {
  return (
    <>
      <PageHero
        title="App Development"
        description="We create powerful mobile applications for Android and iOS that deliver exceptional user experiences. From business solutions to consumer apps, we bring your mobile vision to life."
      />

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Multi-Platform Expertise</h2>
            <p className="mt-3 text-muted-foreground">
              Whether you need native performance or cross-platform efficiency, we've got you
              covered
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {platforms.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="p-8 rounded-2xl bg-card border border-border h-full text-center">
                  <div className="w-12 h-12 grid place-items-center rounded-full bg-foreground text-background mx-auto">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-semibold text-lg">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">App Features We Excel At</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="flex gap-4 p-6 rounded-2xl bg-background border border-border h-full">
                  <div className="w-11 h-11 grid place-items-center rounded-xl bg-foreground text-background shrink-0">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Applications We Build</h2>
          </Reveal>
          <div className="space-y-4">
            {apps.map(([title, desc, tags], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="p-7 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-background border border-border"
                      >
                        <CheckCircle2 className="w-3 h-3" /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Technologies &amp; Tools</h2>
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {stack.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-full bg-background border border-border text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's Build Your Next App"
        description="Turn your app idea into reality with our expert development team"
        ctaLabel="Start Your Project"
      />
    </>
  );
}
