import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "Contact Work Wizards Innovations to discuss your next digital product, mobile app, or marketing launch.",
      },
      { property: "og:title", content: "Contact | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "Reach out to our team for fast quotes on web, mobile, and AI-powered software projects.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        title="Get In Touch"
        description="Have a project in mind? Let's discuss how we can help bring your ideas to life."
      />
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="mt-14 grid gap-8 md:grid-cols-[55%_45%]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl bg-slate-50 p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-2xl font-semibold text-foreground">Reach Us Directly</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Reach out to our team directly for faster responses and project support.
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-700">
                  <a
                    href="mailto:official@wwi.org.in"
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background">
                      <Mail className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-xs text-muted-foreground">official@wwi.org.in</p>
                    </div>
                  </a>
                  <a
                    href="tel:+919618131779"
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-xs text-muted-foreground">+91 96181 31779</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-xs text-muted-foreground">Remote-first · India</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
