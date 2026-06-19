import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Mail, Phone } from "lucide-react";
import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={logo} alt="Work Wizards Innovations" className="w-7 h-7" />
            <span>Work Wizards Innovations</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-3">Innovating Web, Apps &amp; Beyond.</p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Services</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services/web" className="hover:text-foreground">
                Web Services
              </Link>
            </li>
            <li>
              <Link to="/services/app" className="hover:text-foreground">
                App Development
              </Link>
            </li>
            <li>
              <Link to="/services/maintenance" className="hover:text-foreground">
                Maintenance &amp; Support
              </Link>
            </li>
            <li>
              <Link to="/services/social-sphere" className="hover:text-foreground">
                The Social Sphere
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-foreground">
                Our Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Legal &amp; Connect</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://linkedin.com/company/workwizardsinnovations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/workwizardsinnovations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:official@wwi.org.in"
              aria-label="Email"
              className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+919618131779"
              aria-label="Phone"
              className="w-9 h-9 grid place-items-center rounded-full bg-secondary hover:bg-foreground hover:text-background transition"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Work Wizards Innovations PVT. LTD. All rights reserved.
          </span>
          <span>Innovating Web, Apps &amp; Beyond</span>
        </div>
      </div>
    </footer>
  );
}
