import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try again or head home.
        </p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Work Wizards Innovations | Innovating Web, Apps & AI" },
      {
        name: "description",
        content:
          "Work Wizards Innovations Pvt Ltd crafts scalable websites, mobile apps, and AI-driven digital experiences for growth-minded brands.",
      },
      { property: "og:title", content: "Work Wizards Innovations | Innovating Web, Apps & AI" },
      {
        property: "og:description",
        content:
          "A digital studio building fast websites, native apps, and AI-powered products for modern businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Work Wizards Innovations" },
      { property: "og:image", content: "https://wwi.org.in/favicon.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Work Wizards Innovations | Innovating Web, Apps & AI" },
      {
        name: "twitter:description",
        content:
          "A digital studio building fast websites, native apps, and AI-powered products for modern businesses.",
      },
      { name: "twitter:image", content: "https://wwi.org.in/favicon.svg" },
      {
        name: "keywords",
        content:
          "web development, app development, AI software, digital agency, startup technology, India, Work Wizards Innovations",
      },
      { name: "author", content: "Work Wizards Innovations Pvt Ltd" },
      { name: "publisher", content: "Work Wizards Innovations" },
      { name: "robots", content: "index, follow" },
      {
        httpEquiv: "Content-Security-Policy",
        content:
          "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.googletagmanager.com https://images.unsplash.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://wwi-careers-api.workwizardsinnovations-official.workers.dev ws:; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'self'; base-uri 'self';",
      },
      { httpEquiv: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "X-Frame-Options", content: "DENY" },
      { name: "theme-color", content: "#111827" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S55P7MCT2T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S55P7MCT2T',{send_page_view:true});",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Work Wizards Innovations",
              url: "https://wwi.org.in",
              logo: "https://wwi.org.in/favicon.svg",
              sameAs: [
                "https://www.facebook.com/WorkWizardsInnovations",
                "https://www.linkedin.com/company/work-wizards-innovations",
                "https://www.instagram.com/workwizardsinnovations",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "official@wwi.org.in",
                  url: "https://wwi.org.in/contact",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/vks");
  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? "min-h-screen" : "min-h-screen pt-16"}>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      <Toaster />
    </QueryClientProvider>
  );
}
