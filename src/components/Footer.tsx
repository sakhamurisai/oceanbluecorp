import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "ERP Solutions", href: "/services#erp" },
    { name: "Cloud Services", href: "/services#cloud" },
    { name: "Data Analytics & AI", href: "/services#ai" },
    { name: "Salesforce", href: "/services#salesforce" },
    { name: "Staffing Services", href: "/services#staffing" },
    { name: "Training Services", href: "/services#training" },
    { name: "Managed Services", href: "/services#managed" },
    { name: "Outsourcing", href: "/services#outsourcing" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/oceanbluecorp", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/oceanbluecorp", icon: Twitter },
  { name: "YouTube", href: "https://youtube.com/oceanbluecorp", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://oceanbluecorp.com/images/logo-oc.png"
                alt="Ocean Blue Corporation"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Empowering enterprises with streamlined tech solutions. Specializing in
              ERP, Salesforce, Cloud, and staffing expertise for Manufacturing,
              Retail, and Government sectors.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hr@oceanbluecorp.com"
                className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hr@oceanbluecorp.com</span>
              </a>
              <a
                href="tel:+16148446925"
                className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 614-844-6925</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  9775 Fairway Drive, Suite C
                  <br />
                  Powell, OH 43065
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links in this column */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Ocean Blue Corporation. All
              rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Innovation, Dedication, Excellence, Commitment
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
