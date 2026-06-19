import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Linkedin, Instagram, Globe, Calendar, Rocket, Users, Handshake } from "lucide-react";
import venkat from "../assets/Venkat Nalla - Founder and CEO of Work Wizards Innovations PVT LTD.jpg";
import santhosh from "../assets/Santhosh Boppudi CTO.jpg";
import govinda from "../assets/Govinda sai ram COO.jpg";
import charan from "../assets/Charan Teja Rajanala MD.jpg";
import prudhvi from "../assets/Duvvu Prudhvi CFO.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Work Wizards Innovations" },
      {
        name: "description",
        content: "Learn about the team, mission, and technology behind Work Wizards Innovations.",
      },
      { property: "og:title", content: "About Us | Work Wizards Innovations" },
      {
        property: "og:description",
        content:
          "Discover the leadership and the story behind our web, app, and AI product studio.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Nalla Venkat",
    role: "Founder & Chief Executive Officer (CEO)",
    bio: "Nalla Venkat is the founder of Work Wizards Innovations and the visionary behind the company's mission and long-term strategy. He leads the organization by defining its direction, identifying new opportunities, and driving innovation across all projects. Venkat focuses on building strong partnerships, guiding the development of new technologies, and ensuring that the company continuously evolves to meet future industry demands.",
    image: venkat,
    socials: ["linkedin", "instagram", "web"],
    links: {
      linkedin: "https://www.linkedin.com/in/nallavenkat/",
      instagram: "https://www.instagram.com/venkatnalla_7/",
      web: "https://venkatnalla.in",
    },
  },
  {
    name: "Santhosh Boppudi",
    role: "Co-Founder & Chief Technology Officer (CTO)",
    bio: "Santhosh Boppudi leads the technological development at Work Wizards Innovations. As CTO, he is responsible for designing the company's technical architecture, overseeing software development, and ensuring that the products are built using efficient and scalable technologies. He plays a key role in transforming ideas into functional digital platforms and maintaining the technological backbone of the organization.",
    image: santhosh,
    socials: ["linkedin", "instagram", "web"],
    links: {
      linkedin: "https://www.linkedin.com/in/santhoshboppudi/",
      instagram: "https://www.instagram.com/boppudi.wwi/",
      web: "https://santhoshboppudi.in",
    },
  },
  {
    name: "Govinda Sai Ram Thammisetty",
    role: "Chief Operating Officer (COO)",
    bio: "Govinda Sai Ram Thammisetty manages the operational structure of the company. As COO, he ensures that projects are executed efficiently and that team coordination remains smooth across all activities. He focuses on operational planning, resource management, and maintaining the workflow required to deliver successful products and services.",
    image: govinda,
    socials: ["linkedin", "instagram"],
    links: {
      linkedin: "https://www.linkedin.com/in/govinda-sai-ram/",
      instagram: "https://www.instagram.com/ram.wwi/",
    },
  },
  {
    name: "Charan Teja Rajanala",
    role: "Chief Marketing Officer (CMO)",
    bio: "Charan Teja Rajanala is responsible for the marketing strategy and brand development of Work Wizards Innovations. As CMO, he focuses on promoting the company's products, expanding market reach, and building a strong brand presence. His work involves digital marketing strategies, partnership outreach, and ensuring that the company's innovations reach the right audience.",
    image: charan,
    socials: ["linkedin", "instagram"],
    links: {
      linkedin: "https://www.linkedin.com/in/rajanalacharanteja/",
      instagram: "https://www.instagram.com/charan.wwi/",
    },
  },
  {
    name: "Prudhvi Duvvu",
    role: "Chief Financial Officer (CFO)",
    bio: "Prudhvi Duvvu oversees the financial planning and management of Work Wizards Innovations. As CFO, he is responsible for managing financial resources, budgeting, and ensuring sustainable financial growth. He plays an important role in maintaining financial stability while supporting the company's expansion and long-term business strategy.",
    image: prudhvi,
    socials: ["linkedin", "instagram"],
    links: {
      linkedin: "https://www.linkedin.com/in/prudhviduvvu/",
      instagram: "https://www.instagram.com/prudhvi.wwi/",
    },
  },
];

const journey = [
  { icon: Calendar, when: "Sep 2025", what: "Founded by a team of 5 passionate innovators" },
  { icon: Rocket, when: "Dec 2025", what: "First collaboration with Glowvai" },
  { icon: Users, when: "Early 2026", what: "Team stabilized with stronger strategies" },
  { icon: Handshake, when: "Feb 2026", what: "Began working with active clients" },
];

function PersonAvatar({ image, name }: { image: string; name: string }) {
  if (image)
    return (
      <img
        loading="lazy"
        src={image}
        alt={`${name} portrait`}
        className="w-full h-full object-cover"
      />
    );
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="w-full h-full grid place-items-center bg-secondary text-2xl font-bold">
      {initials}
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story & Team"
        description="The passionate leaders behind Work Wizards Innovations, committed to driving digital transformation and delivering excellence."
      />

      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Leadership</h2>
          </Reveal>
          <div className="space-y-16">
            {team.map((m, i) => (
              <Reveal key={m.name}>
                <div
                  className={`grid md:grid-cols-[260px_1fr] gap-8 items-start ${i % 2 ? "md:[direction:rtl]" : ""}`}
                >
                  <div className="md:[direction:ltr] w-full aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                    <PersonAvatar image={m.image} name={m.name} />
                  </div>
                  <div className="md:[direction:ltr]">
                    <h3 className="text-2xl font-bold">{m.name}</h3>
                    <div className="text-sm font-medium text-muted-foreground mt-1">{m.role}</div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                    <div className="mt-5 flex gap-2">
                      {m.links?.linkedin && (
                        <a
                          aria-label="LinkedIn"
                          href={m.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {m.links?.instagram && (
                        <a
                          aria-label="Instagram"
                          href={m.links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {m.links?.web && (
                        <a
                          aria-label="Website"
                          href={m.links.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-surface">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
          </Reveal>
          <Reveal>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Work Wizards Innovations began its journey on{" "}
                <strong className="text-foreground">26 September 2025</strong>, when a small but
                determined team of five passionate innovators came together with a shared vision —
                to build impactful technology solutions and create meaningful innovation.
              </p>
              <p>
                Like many early-stage startups, the beginning was filled with challenges. As a newly
                formed team, we faced several obstacles related to funding, infrastructure, and
                gaining practical experience in managing large-scale online services. While
                exploring and experimenting with cloud technologies and digital platforms, we
                encountered unexpected technical and operational challenges that tested our
                resilience as a team.
              </p>
              <p>
                However, instead of allowing these difficulties to stop us, we treated them as
                valuable lessons. Through persistence, continuous learning, and strong teamwork, we
                gradually improved our understanding of the technologies we were working with and
                built a stronger foundation for our projects.
              </p>
              <p>
                A major milestone in our journey came in{" "}
                <strong className="text-foreground">December 2025</strong>, when Work Wizards
                Innovations achieved its first collaboration with{" "}
                <strong className="text-foreground">Glowvai</strong>. This partnership marked an
                important step forward and gave the team the confidence that our ideas and efforts
                were moving in the right direction.
              </p>
              <p>
                By <strong className="text-foreground">February 2026</strong>, Work Wizards
                Innovations had begun working with active clients, marking a significant transition
                from a small experimental team into a growing technology startup.
              </p>
              <blockquote className="mt-6 border-l-2 border-foreground pl-4 italic text-foreground/80">
                Today, our journey stands as a reminder that every challenge is an opportunity to
                grow. And this is only the beginning of the story for Work Wizards Innovations.
              </blockquote>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {journey.map((j, i) => (
              <Reveal key={j.when} delay={i * 0.05}>
                <div className="p-5 rounded-2xl bg-background border border-border text-center">
                  <div className="w-10 h-10 grid place-items-center rounded-full bg-secondary mx-auto">
                    <j.icon className="w-4 h-4" />
                  </div>
                  <div className="mt-3 font-semibold">{j.when}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{j.what}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
