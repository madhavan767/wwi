import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Work Wizards Innovations" },
      {
        name: "description",
        content: "Terms governing use of Work Wizards Innovations' website and services.",
      },
      { property: "og:title", content: "Terms of Service | Work Wizards Innovations" },
      {
        property: "og:description",
        content: "Official terms for using Work Wizards Innovations' website and services.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <>
      <PageHero title="Terms of Service" description="Last updated: January 2026" />
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto text-sm text-muted-foreground space-y-5 leading-relaxed">
          <p>
            By accessing or using the Work Wizards Innovations website and services, you agree to be
            bound by these Terms of Service.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Use of Services</h2>
          <p>
            You agree to use our services only for lawful purposes and in a manner consistent with
            all applicable laws and regulations.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Intellectual Property</h2>
          <p>
            All content, trademarks, and code on this site are the property of Work Wizards
            Innovations or its licensors and protected by intellectual property laws.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Disclaimer</h2>
          <p>
            Services are provided "as is" without warranties of any kind. We do not guarantee
            uninterrupted or error-free operation.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Work Wizards Innovations shall not be liable for
            any indirect or consequential damages arising from your use of the services.
          </p>
          <h2 className="text-foreground font-semibold text-lg">Contact</h2>
          <p>For questions about these terms, contact official@wwi.org.in.</p>
        </div>
      </section>
    </>
  ),
});
