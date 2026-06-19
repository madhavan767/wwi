import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { CTASection } from "../components/CTASection";
import { Wrench, ShieldCheck, TrendingUp, Headphones, Check, Zap } from "lucide-react";

export const Route = createFileRoute("/services/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance & Support | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "Pay-as-you-go technical maintenance, security updates, and performance monitoring for your web and app products.",
      },
      { property: "og:title", content: "Maintenance & Support | Work Wizards Innovations" },
      {
        property: "og:description",
        content: "Reliable site and app maintenance backed by security updates and fast support.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/maintenance" }],
  }),
  component: MaintenancePage,
});

const services = [
  {
    icon: Wrench,
    title: "Technical Maintenance",
    desc: "Regular updates, bug fixes, and performance optimization to keep your systems running smoothly",
  },
  {
    icon: ShieldCheck,
    title: "Security Updates",
    desc: "Proactive security monitoring and patches to protect against vulnerabilities",
  },
  {
    icon: TrendingUp,
    title: "Performance Monitoring",
    desc: "24/7 monitoring and optimization to ensure peak performance",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    desc: "Dedicated support team ready to resolve your tech issues quickly",
  },
];

const plans = [
  {
    name: "Basic Support",
    items: [
      "Bug fixes and minor updates",
      "Email support (48hr response)",
      "Monthly performance reports",
      "Security patches",
    ],
    ideal: "Small businesses with stable applications",
  },
  {
    name: "Premium Support",
    items: [
      "Priority bug fixes and updates",
      "24/7 email & phone support",
      "Weekly performance monitoring",
      "Feature enhancements",
      "Database optimization",
    ],
    ideal: "Growing businesses requiring active maintenance",
  },
  {
    name: "Enterprise Support",
    items: [
      "Dedicated support team",
      "Real-time monitoring & alerts",
      "Immediate critical issue response",
      "Custom feature development",
      "Infrastructure management",
      "SLA guarantees",
    ],
    ideal: "Large organizations with mission-critical systems",
  },
];

const cover = [
  "Application Updates & Patches",
  "Security Monitoring & Fixes",
  "Performance Optimization",
  "Uptime Monitoring",
  "Bug Fixing & Debugging",
  "Scalability Improvements",
];

function MaintenancePage() {
  return (
    <>
      <PageHero
        title="Maintenance & Support"
        description="We don't just build your digital solutions—we ensure they stay secure, performant, and up-to-date. Our pay-as-you-go model gives you full technical support without the burden of a full-time tech team."
      />

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Complete Tech Management</h2>
            <p className="mt-3 text-muted-foreground">
              From routine maintenance to critical support, we handle all your technical needs
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="flex gap-4 p-6 rounded-2xl bg-card border border-border h-full">
                  <div className="w-11 h-11 grid place-items-center rounded-xl bg-foreground text-background shrink-0">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Flexible Support Plans</h2>
            <p className="mt-3 text-muted-foreground">
              Choose the level of support that fits your needs with our pay-as-you-go model
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div className="p-7 rounded-2xl bg-background border border-border h-full flex flex-col">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <ul className="mt-5 space-y-2 text-sm flex-1">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 mt-0.5 text-foreground shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Ideal for: </span>
                    {p.ideal}
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
            <h2 className="text-3xl md:text-4xl font-bold">What We Cover</h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {cover.map((c, i) => (
              <Reveal key={c} delay={i * 0.04}>
                <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
                  <div className="w-8 h-8 grid place-items-center rounded-lg bg-foreground text-background">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="p-10 rounded-2xl bg-background border border-border text-center">
              <div className="w-12 h-12 grid place-items-center rounded-full bg-foreground text-background mx-auto">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">Pay-As-You-Go Pricing</h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                No long-term contracts or hidden fees. Pay only for the support and maintenance you
                need, when you need it. Scale up or down based on your requirements without any
                commitment.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto">
                {[
                  ["No", "Long-term Contracts"],
                  ["24/7", "Monitoring Available"],
                  ["100%", "Transparency"],
                ].map(([n, l]) => (
                  <div key={l} className="p-4 rounded-xl bg-card border border-border">
                    <div className="text-xl font-bold">{n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Need Technical Support?"
        description="Let us handle your tech issues while you focus on growing your business"
        ctaLabel="Get Support Now"
      />
    </>
  );
}
