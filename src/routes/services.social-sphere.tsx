import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Megaphone, BarChart3, Users, Zap, Check, Star, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/services/social-sphere")({
  head: () => ({
    meta: [
      { title: "The Social Sphere | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "AI-powered content creation and social media management designed to scale your brand presence.",
      },
      { property: "og:title", content: "The Social Sphere | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "Social media, content, and AI-powered creative plans to grow your audience and leads.",
      },
    ],
    links: [{ rel: "canonical", href: "/services/social-sphere" }],
  }),
  component: SocialPage,
});

const tabs = [
  { icon: Megaphone, label: "AI Content" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Engagement" },
  { icon: Zap, label: "24/7 Support" },
];

const plans = [
  {
    name: "WWI ESSENTIAL",
    price: "₹5,499",
    popular: false,
    items: [
      "Account/handle management (up to 4 handles)",
      "Ad platform management (AdSense, Meta Ads, Adestra)",
      "Lead handling",
      "24×7 support available",
      "12 static creatives",
      "4 story creatives",
      "2 AI-generated videos/reels",
      "Caption writing & hashtag strategy",
      "Content scheduling",
      "Basic profile optimization",
      "Monthly performance report",
      "AI image-based branded content",
    ],
  },
  {
    name: "WWI GROWTH",
    price: "₹7,999",
    popular: true,
    items: [
      "Management of 6 social media platforms",
      "Ad platform management (AdSense, Meta Ads, Adestra)",
      "Lead handling",
      "24×7 support available",
      "16–20 posts/month",
      "9–12 story creatives",
      "4 AI-generated short videos/reels",
      "Creative design & caption writing",
      "Monthly content calendar",
      "Competitor analysis",
      "Basic engagement management",
      "Monthly analytics report",
      "AI visuals + typography video content",
    ],
  },
  {
    name: "WWI PREMIUM BRAND",
    price: "₹11,999",
    popular: false,
    items: [
      "Ad platform management (AdSense, Meta Ads, Adestra)",
      "Lead handling",
      "24×7 priority support",
      "Unlimited social media platforms",
      "20–30 posts/month",
      "12–20 story creatives",
      "6–8 AI-generated reels/videos",
      "Premium branded creative designs",
      "Motion graphics content",
      "Typography campaign videos",
      "Advanced audience engagement support",
      "Detailed performance reporting",
      "Campaign strategy & creative planning",
    ],
  },
];

function SocialPage() {
  return (
    <>
      <section className="pt-28 pb-12 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              ← Back to Home
            </a>
          </div>
          <Reveal>
            <div className="inline-flex items-center text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1 mb-4">
              by Work Wizards Innovations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">The Social Sphere</h1>
            <p className="mt-4 text-base md:text-lg font-medium">
              AI-Powered Content Creation &amp; Social Media Management
            </p>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A subscription-based AI-powered social media growth engine designed to help businesses
              scale their digital presence with consistent content, ad management, and audience
              engagement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium"
              >
                View Plans →
              </a>
              <a
                href="#enterprise"
                className="inline-flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                Get Started
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {tabs.map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-center gap-2 py-5 text-sm border-r last:border-r-0 border-border"
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Choose Your Plan</h2>
            <p className="mt-3 text-muted-foreground">
              Flexible plans designed for every stage of your social media journey
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Entry-Level Plan
            </div>
            <div className="max-w-2xl mx-auto p-7 rounded-2xl bg-card border border-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Social Media Maintenance Plan</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For businesses that already have content and need professional management
                    support.
                  </p>
                </div>
                <a
                  href="#enterprise"
                  className="bg-foreground text-background rounded-full px-4 py-2 text-xs font-medium shrink-0"
                >
                  Get Started
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5">
                {[
                  ["₹1,999/mo", "Up to 4 social media handles"],
                  ["₹2,499/mo", "5 or more handles"],
                ].map(([p, s]) => (
                  <div key={p} className="p-3 rounded-xl bg-background border border-border">
                    <div className="font-bold">{p}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {[
                  "Social media handle management (posting provided content)",
                  "Maintenance of Meta Ads, Google AdSense & Adestra",
                  "Dedicated support hours",
                  "Regular posting & account activity management",
                  "Basic engagement handling",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 mt-0.5 text-foreground shrink-0" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground italic">
                Discounts available for quarterly, half-yearly &amp; annual plans. Contact The
                Social Sphere team for offers.
              </p>
            </div>
          </Reveal>

          <div className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 mt-16">
            All-Inclusive Plans
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <div
                  className={`relative p-7 rounded-2xl bg-card border h-full flex flex-col ${p.popular ? "border-foreground ring-2 ring-foreground/10" : "border-border"}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-foreground text-background text-xs px-3 py-1 rounded-full">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  )}
                  <div className="text-xs font-semibold tracking-wider">{p.name}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{p.price}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm flex-1">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 mt-0.5 text-foreground shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#enterprise"
                    className="mt-6 inline-flex justify-center bg-foreground text-background rounded-full py-2.5 text-sm font-medium"
                  >
                    Get Started
                  </a>
                  <a
                    href="#enterprise"
                    className="mt-2 text-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="enterprise" className="px-6 py-20">
        <div className="max-w-5xl mx-auto rounded-3xl bg-foreground text-background p-12 md:p-16 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">WWI Enterprise / Contact</h2>
            <p className="mt-3 text-background/70">
              For large businesses, agencies, and custom requirements — reach out to our team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href="tel:+919618131779"
                className="inline-flex items-center gap-2 bg-background/10 border border-background/20 rounded-full px-5 py-2.5 text-sm"
              >
                <Phone className="w-4 h-4" /> +91 96181 31779
              </a>
              <a
                href="tel:+919492033686"
                className="inline-flex items-center gap-2 bg-background/10 border border-background/20 rounded-full px-5 py-2.5 text-sm"
              >
                <Phone className="w-4 h-4" /> +91 94920 33686
              </a>
            </div>
            <div className="mt-3 flex justify-center">
              <a
                href="mailto:thesocialsphere@wwi.org.in"
                className="inline-flex items-center gap-2 bg-background/10 border border-background/20 rounded-full px-5 py-2.5 text-sm"
              >
                <Mail className="w-4 h-4" /> thesocialsphere@wwi.org.in
              </a>
            </div>
            <p className="mt-10 text-sm text-background/60 italic">
              "The Social Sphere by Work Wizards Innovations — A premium AI-powered social media
              growth solution for modern businesses."
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
