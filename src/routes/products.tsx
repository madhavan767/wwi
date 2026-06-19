import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import {
  FileText,
  PenSquare,
  Download,
  Sparkles,
  Clock,
  BookOpen,
  Brain,
  Layers,
  Timer,
  Bell,
  Sparkle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "See Viadocs, KNOWRA, and other homegrown products built by Work Wizards Innovations for real-world business needs.",
      },
      { property: "og:title", content: "Products | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "Explore our suite of digital products designed for productivity, knowledge sharing, and business growth.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function ProductsPage() {
  const target = new Date(Date.now() + 1000 * 60 * 60 * 24 * 60);
  const c = useCountdown(target);

  return (
    <>
      <PageHero
        title="Our Products"
        description="We design and develop our own innovative digital platforms that solve real-world problems. Each product is built with cutting-edge technology and user-centric design."
      />

      {/* Viadocs */}
      <section className="px-6 py-20 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-emerald-500/15 text-emerald-300 text-xs px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Now Live
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Viadocs</h2>
            <p className="mt-3 text-background/70">
              The all-in-one PDF platform with AI-powered document creation
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <Reveal>
              <p className="text-background/70 leading-relaxed">
                Viadocs is our debut product—a comprehensive PDF management platform designed for
                students, professionals, and businesses who need powerful document tools at their
                fingertips.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  [FileText, "Edit, Convert & Compress PDFs"],
                  [PenSquare, "Secure Digital Signatures"],
                  [Download, "Merge & Split Documents"],
                  [Sparkles, "AI-Powered Document Creation"],
                ].map(([Icon, label], i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/5 border border-background/10"
                  >
                    <div className="w-9 h-9 grid place-items-center rounded-lg bg-background/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{label as string}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://viadocs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Try Viadocs Now
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-10 rounded-2xl bg-background/5 border border-background/10">
                <div className="aspect-video rounded-xl bg-background/10 grid place-items-center">
                  <FileText className="w-16 h-16 text-background/40" />
                </div>
                <h4 className="mt-5 font-semibold">All-in-One PDF Solution</h4>
                <p className="mt-1 text-sm text-background/60">
                  Edit, convert, compress, and create PDFs with AI assistance. Everything you need
                  in one powerful platform.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KNOWRA */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-secondary text-foreground text-xs px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" /> Coming Soon
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">KNOWRA</h2>
            <p className="mt-3 text-muted-foreground">
              A revolutionary student-centric platform designed to enhance learning and productivity
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <h4 className="font-semibold">Empowering Students</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                KNOWRA is our next big innovation—a comprehensive platform built specifically for
                students. It combines smart learning tools, AI-powered insights, and productivity
                features to help students achieve their academic goals.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  [
                    BookOpen,
                    "Smart Learning Tools",
                    "Personalized study plans and progress tracking",
                  ],
                  [
                    Brain,
                    "AI-Powered Insights",
                    "Intelligent recommendations based on learning patterns",
                  ],
                  [
                    Layers,
                    "Comprehensive Resources",
                    "Curated educational content for all subjects",
                  ],
                  [Timer, "Time Management", "Built-in study timers and productivity tools"],
                ].map(([Icon, title, desc], i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                    <div className="w-9 h-9 grid place-items-center rounded-lg bg-foreground text-background shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{title as string}</div>
                      <div className="text-xs text-muted-foreground">{desc as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-foreground text-background">
                <div className="text-center font-semibold">Launching In</div>
                <div className="mt-5 grid grid-cols-4 gap-3 text-center">
                  {[
                    ["Days", c.d],
                    ["Hours", c.h],
                    ["Minutes", c.m],
                    ["Seconds", c.s],
                  ].map(([l, v]) => (
                    <div key={l as string} className="p-3 rounded-xl bg-background/10">
                      <div className="text-2xl font-bold tabular-nums">
                        {String(v).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] text-background/60 uppercase tracking-wider mt-1">
                        {l as string}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.success("You'll be notified at launch!")}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-background text-foreground rounded-full py-2.5 text-sm font-medium"
                >
                  <Bell className="w-4 h-4" /> Get Notified at Launch
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Product Philosophy</h2>
            <p className="mt-3 text-muted-foreground">
              We don't just build products—we create solutions that make a real difference.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["01", "User-Centric", "Every feature is designed with users in mind"],
              ["02", "Innovation First", "We leverage the latest technology to solve problems"],
              ["03", "Continuous Growth", "Regular updates and improvements based on feedback"],
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <div className="p-7 rounded-2xl bg-background border border-border text-center">
                  <div className="text-3xl font-bold">{n}</div>
                  <h3 className="mt-3 font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto rounded-3xl bg-foreground text-background p-12 text-center">
          <Sparkle className="w-6 h-6 mx-auto" />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">Stay Updated on Our Products</h2>
          <p className="mt-3 text-background/70">
            Be the first to know about new features, product launches, and exclusive updates
          </p>
          <button
            onClick={() => toast.success("Subscribed!")}
            className="mt-6 inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-sm font-medium"
          >
            Subscribe for Updates
          </button>
        </div>
      </section>
    </>
  );
}
