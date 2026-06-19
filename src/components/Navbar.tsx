import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "../assets/logo.svg";

const services = [
  { name: "Web Services", to: "/services/web" },
  { name: "App Development", to: "/services/app" },
  { name: "Maintenance & Support", to: "/services/maintenance" },
  { name: "The Social Sphere", to: "/services/social-sphere" },
  { name: "Our Products", to: "/products" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-sm text-foreground/80 hover:text-foreground transition-colors";
  const activeProps = { className: "text-sm text-foreground font-semibold" };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-border"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight group">
          <img
            src={logoUrl}
            alt="Work Wizards Innovations logo"
            width={36}
            height={22}
            className="h-6 w-auto transition-transform group-hover:scale-110"
          />
          <span className="hidden sm:inline">Work Wizards Innovations</span>
          <span className="sm:hidden">WWI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={linkClass}
            activeProps={activeProps}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className={`${linkClass} flex items-center gap-1`}>
              Services <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                >
                  <div className="bg-background border border-border rounded-2xl shadow-lg p-2 min-w-[220px]">
                    {services.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        className="block px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className={linkClass} activeProps={activeProps}>
            About Us
          </Link>
          <Link to="/careers" className={linkClass} activeProps={activeProps}>
            Careers
          </Link>
          <Link to="/contact" className={linkClass} activeProps={activeProps}>
            Contact
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
          {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link to="/" onClick={() => setMobile(false)} className="text-sm py-1">
                Home
              </Link>
              <div className="text-xs uppercase tracking-wider text-muted-foreground pt-2">
                Services
              </div>
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setMobile(false)}
                  className="text-sm py-1 pl-2"
                >
                  {s.name}
                </Link>
              ))}
              <Link to="/about" onClick={() => setMobile(false)} className="text-sm py-1">
                About Us
              </Link>
              <Link to="/careers" onClick={() => setMobile(false)} className="text-sm py-1">
                Careers
              </Link>
              <Link to="/contact" onClick={() => setMobile(false)} className="text-sm py-1">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
