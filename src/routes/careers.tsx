import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "../components/BackButton";
import { Reveal } from "../components/Reveal";
import { ApplyWizard } from "../components/ApplyWizard";
import {
  ArrowDown,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  Lightbulb,
  Heart,
  Sparkles,
  Users,
  Loader2,
} from "lucide-react";
import { api, type JobOpening } from "../lib/api";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "Join Work Wizards Innovations and help build modern web, mobile, and AI products in a collaborative remote-first environment.",
      },
      { property: "og:title", content: "Careers | Work Wizards Innovations" },
      {
        property: "og:description",
        content: "Explore career opportunities with our fast-growing digital product studio.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const values = [
  [
    "Fueled by Curiosity",
    "We encourage experimentation and creative problem-solving. Every idea matters, every voice is heard.",
  ],
  [
    "Move Fast, Build Smart",
    "We ship with speed and precision, iterating quickly while maintaining high quality standards.",
  ],
  [
    "People First",
    "Flexible work, open culture, and genuine care for every team member's growth and wellbeing.",
  ],
  [
    "Grow Together",
    "Mentorship, learning budgets, and real ownership. Your career accelerates here.",
  ],
];

const benefits = [
  { icon: MapPin, label: "Remote First" },
  { icon: Clock, label: "Flexible Hours" },
  { icon: Lightbulb, label: "Learning Budget" },
  { icon: Heart, label: "Team Events" },
];

function CareersPage() {
  const [open, setOpen] = useState<{ role: string; jobId?: string | number } | null>(null);

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: api.listJobs,
    staleTime: 30_000,
  });

  const visibleJobs: JobOpening[] = (jobs ?? []).filter(
    (j) => !j.archived && j.published !== false,
  );

  return (
    <>
      <section className="pt-28 pb-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Join the company
                <br />
                with the bold
                <br />
                <span className="text-muted-foreground">new vision.</span>
              </h1>
              <a
                href="#positions"
                className="mt-8 inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Job openings <ArrowDown className="w-4 h-4" />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed">
                At Work Wizards Innovations, we're shaping the future of digital solutions. Join us
                to build cutting-edge web and mobile platforms, work with emerging technologies, and
                solve real-world problems — all while growing your career in a collaborative,
                remote-first environment.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            {[
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
            ].map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <img
                  loading="lazy"
                  src={src}
                  alt="Team collaborating"
                  className="rounded-2xl aspect-[4/3] w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1">
              Careers
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Grounded and ground-breaking.</h2>
            <p className="mt-3 text-muted-foreground">
              We're changing the paradigm every day, with curiosity, vision and deep expertise.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {values.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="p-7 rounded-2xl bg-card border border-border h-full">
                  <div className="text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Why Work at WWI?</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-background border border-border text-center">
                  <div className="w-10 h-10 grid place-items-center rounded-lg bg-secondary mx-auto">
                    <b.icon className="w-4 h-4" />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{b.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="positions" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Open Positions</h2>
            <p className="mt-3 text-muted-foreground">
              Find your next role and start building the future with us
            </p>
          </Reveal>

          {isLoading ? (
            <div className="flex justify-center py-12 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-sm text-muted-foreground">
              Couldn't load openings right now. Please try again later.
            </div>
          ) : visibleJobs.length === 0 ? (
            <Reveal>
              <div
                className="mx-auto max-w-2xl rounded-2xl p-10 text-center"
                style={{ background: "#F8F8F8" }}
              >
                <Sparkles className="w-6 h-6 mx-auto text-foreground/70" />
                <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                  Currently We Are Not Hiring
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Stay updated for future opportunities — we'll let you know when new roles open up.
                </p>
                <a
                  href="mailto:careers@wwi.org.in?subject=Subscribe%20to%20WWI%20Careers%20Updates"
                  className="mt-6 inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>
          ) : (
            <>
              <div className="space-y-3">
                {visibleJobs.map((job, i) => (
                  <Reveal key={job.id} delay={i * 0.04}>
                    <div className="flex flex-wrap gap-4 items-center p-6 rounded-2xl bg-card border border-border hover:border-foreground/40 transition-colors">
                      <div className="flex-1 min-w-[260px]">
                        <h3 className="font-semibold">{job.title}</h3>
                        {job.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {job.description}
                          </p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          {job.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {job.location}
                            </span>
                          )}
                          {job.employmentType && (
                            <span className="inline-flex items-center gap-1">
                              <Briefcase className="w-3 h-3" /> {job.employmentType}
                            </span>
                          )}
                          {job.experience && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {job.experience}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setOpen({ role: job.title, jobId: job.id })}
                        className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                      >
                        Apply Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="mt-10 rounded-3xl bg-foreground text-background p-10 text-center">
                  <Sparkles className="w-5 h-5 mx-auto" />
                  <h3 className="mt-3 text-2xl font-bold">Don't see your role?</h3>
                  <p className="mt-2 text-sm text-background/70 max-w-xl mx-auto">
                    We're always looking for talented people. Send us a general application and
                    we'll reach out when a matching role opens up.
                  </p>
                  <button
                    onClick={() => setOpen({ role: "General Application" })}
                    className="mt-6 inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-sm font-medium"
                  >
                    <Users className="w-4 h-4" /> General Application{" "}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>

      {open && <ApplyWizard role={open.role} jobId={open.jobId} onClose={() => setOpen(null)} />}
    </>
  );
}
