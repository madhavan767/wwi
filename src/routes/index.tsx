import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Wrench,
  Package,
  Sparkles,
  Brain,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Mail,
  Linkedin,
  Instagram,
  Twitter,
  Phone,
  Send,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Work Wizards Innovations | Innovating Web, Apps & AI" },
      {
        name: "description",
        content:
          "We build cutting-edge web, mobile, and AI-powered digital products that empower modern businesses.",
      },
      { property: "og:title", content: "Work Wizards Innovations | Innovating Web, Apps & AI" },
      {
        property: "og:description",
        content:
          "A full-service digital studio crafting fast websites, native apps, and AI-powered tools for growing businesses.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  {
    icon: Globe,
    title: "Web Services",
    desc: "Custom websites tailored for business and reach with modern design and functionality.",
    to: "/services/web",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native Android & iOS applications for business and personal use cases with seamless user experiences.",
    to: "/services/app",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    desc: "Ongoing technical support for your website and apps to ensure optimal performance and reliability.",
    to: "/services/maintenance",
  },
  {
    icon: Package,
    title: "Our Products",
    desc: "Innovative homegrown digital platforms designed to solve real-world problems and enhance productivity.",
    to: "/products",
  },
  {
    icon: Sparkles,
    title: "The Social Sphere",
    desc: "AI-powered content creation & social media management to scale your brand presence with ease.",
    to: "/services/social-sphere",
  },
];

const why = [
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Cutting-edge solutions that push the boundaries of what's possible in digital technology.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Robust, tested, and dependable systems you can trust for your critical business needs.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Harness the power of artificial intelligence to automate and enhance your workflows.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Support",
    desc: "Ongoing maintenance and updates to keep your digital assets performing at their best.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-20 pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
            className="text-[42px] md:text-[58px] lg:text-[72px] tracking-tight"
          >
            Work Wizards
            <br />
            Innovations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Innovating Web, Apps &amp; Beyond
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Explore Our Services <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
            >
              Get In Touch
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5"
          >
            <Sparkles className="w-3 h-3" /> Next-Gen Digital Solutions
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-3 text-muted-foreground">
              Comprehensive digital solutions designed to elevate your business
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <Link
                  to={s.to}
                  className="group block h-full p-7 rounded-2xl bg-card border border-border hover:border-foreground/40 hover:-translate-y-1 transition-all"
                >
                  <s.icon className="w-6 h-6 text-foreground" />
                  <h3 className="mt-5 font-semibold text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Choose Us</h2>
            <p className="mt-3 text-muted-foreground">
              We deliver excellence through innovation, reliability, and unwavering commitment.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="p-7 rounded-2xl bg-background border border-border h-full flex gap-5">
                  <div className="w-11 h-11 grid place-items-center rounded-xl bg-foreground text-background shrink-0">
                    <w.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{w.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Us</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <h3 className="text-xl font-semibold">Turning Ideas Into Digital Reality</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  At Work Wizards Innovations, we are a next-gen tech startup dedicated to building
                  innovative digital solutions that empower businesses and professionals. Our
                  expertise spans custom web development, mobile app creation, ongoing technical
                  support, and launching our own brand of digital platforms that solve real-world
                  problems.
                </p>
                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-sm"
                >
                  Get there <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <div className="grid gap-6">
              <Reveal delay={0.1}>
                <div className="p-7 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold">Our Mission</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    To deliver cutting-edge digital solutions that drive innovation, efficiency, and
                    growth for our clients and users.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="p-7 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold">Our Vision</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    To be the leading force in digital transformation, creating products and
                    services that shape the future of technology.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Join Our Team</h2>
            <p className="mt-3 text-muted-foreground">
              Be part of the next generation of digital innovators
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="p-7 rounded-2xl bg-background border border-border h-full">
                <Zap className="w-5 h-5" />
                <h3 className="mt-4 font-semibold">Why Work With Us?</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Work on cutting-edge technologies</li>
                  <li>Flexible, remote-work options</li>
                  <li>Continuous learning opportunities</li>
                  <li>Collaborative team environment</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-7 rounded-2xl bg-background border border-border h-full">
                <Sparkles className="w-5 h-5" />
                <h3 className="mt-4 font-semibold">We're Hiring!</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We're always looking for talented individuals to join our growing team. Explore
                  open positions and start your journey with us.
                </p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 bg-foreground text-background rounded-full px-4 py-2 text-sm"
                >
                  Explore Careers at WWI <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA + Stats */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto rounded-3xl bg-foreground text-background p-12 md:p-16">
          <Reveal className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="mt-3 text-background/70">
              Join forces with Work Wizards Innovations and bring your vision to life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-background text-foreground rounded-full px-5 py-2.5 text-sm font-medium"
              >
                Work With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center border border-background/30 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-background/10"
              >
                Join the Journey
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-10 border-t border-background/15">
              {[
                ["100+", "Projects Delivered"],
                ["50+", "Happy Clients"],
                ["24/7", "Support Available"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl md:text-4xl font-bold">{n}</div>
                  <div className="mt-1 text-xs text-background/60">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Get In Touch</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-black" />
            <p className="mt-5 text-sm text-muted-foreground">
              Have a project in mind? Let's discuss how we can help bring your ideas to life.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-[55%_45%]">
            <div>
              <form className="space-y-5 rounded-3xl border border-border bg-background p-6 shadow-sm">
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Name</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="mt-3 block w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                    style={{ height: 48 }}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Email</span>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-3 block w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                    style={{ height: 48 }}
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Message</span>
                  <textarea
                    placeholder="Tell us about your project..."
                    className="mt-3 block w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                    style={{ minHeight: 140, resize: "vertical" }}
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 text-sm font-semibold text-background transition hover:bg-black"
                  style={{ height: 48 }}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="rounded-xl bg-slate-50 p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-2 text-2xl font-semibold text-foreground">
                <Mail className="w-5 h-5" />
                Connect With Us
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Follow us on social media to stay updated with our latest innovations and products.
              </p>
              <div className="mt-8 grid gap-3 text-sm text-slate-700">
                <a
                  href="https://linkedin.com/company/workwizardsinnovations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-black">
                    <Linkedin className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">LinkedIn</p>
                    <p className="text-xs text-muted-foreground">/company/workwizardsinnovations</p>
                  </div>
                </a>
                <a
                  href="https://x.com/workwizards26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-black">
                    <Twitter className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">X (Twitter)</p>
                    <p className="text-xs text-muted-foreground">@workwizards26</p>
                  </div>
                </a>
                <a
                  href="https://instagram.com/workwizardsinnovations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-black">
                    <Instagram className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Instagram</p>
                    <p className="text-xs text-muted-foreground">@workwizardsinnovations</p>
                  </div>
                </a>
                <a
                  href="tel:+919618131779"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-black">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-xs text-muted-foreground">+91 9618131779</p>
                  </div>
                </a>
                <a
                  href="mailto:official@wwi.org.in"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition hover:border-foreground/30 hover:bg-slate-50 hover:text-black"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-black">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-xs text-muted-foreground">official@wwi.org.in</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
