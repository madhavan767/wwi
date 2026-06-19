import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Work Wizards Innovations" },
      {
        name: "description",
        content:
          "How Work Wizards Innovations collects, uses, and protects visitor information on the website.",
      },
      { property: "og:title", content: "Privacy Policy | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "Read our privacy practices for contact forms, cookies, and data used to improve the website experience.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <>
      <PageHero title="Privacy Policy" description="Last updated: January 2026" />
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto prose-sm text-sm text-muted-foreground space-y-5 leading-relaxed">
          <p>
            Work Wizards Innovations Pvt Ltd ("we", "us") respects your privacy. This policy
            explains what data we collect when you use our website and services, how we use it, and
            the rights you have over it.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Information We Collect</h2>
          <p>
            We collect information you provide directly to us — such as your name, email, and
            message contents — as well as basic technical data (device, browser, referrer) used to
            operate and improve the site.
          </p>
          <h2 className="text-foreground font-semibold text-lg">How We Use Information</h2>
          <p>
            To respond to inquiries, deliver requested services, improve our products, and comply
            with legal obligations. We do not sell your personal data.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Cookies</h2>
          <p>
            We use essential cookies to operate the site and optional analytics cookies to
            understand usage. You can control cookies in your browser settings.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by emailing
            official@wwi.org.in.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Contact</h2>
          <p>For any privacy-related questions, contact us at official@wwi.org.in.</p>
        </div>
      </section>
    </>
  ),
});
