"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  Send,
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  services: [
    { name: "ERP Solutions", href: "/services#erp" },
    { name: "Cloud Services", href: "/services#cloud" },
    { name: "Data Analytics & AI", href: "/services#ai" },
    { name: "Salesforce", href: "/services#salesforce" },
    { name: "Staffing Services", href: "/services#staffing" },
    { name: "Training Services", href: "/services#training" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/resources/blog" },
    { name: "Case Studies", href: "/resources/case-studies" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "E-Books", href: "/resources/ebook" },
    { name: "Whitepapers", href: "/resources" },
    { name: "Webinars", href: "/resources" },
    { name: "Documentation", href: "/resources" },
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a192f] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="container-custom py-12 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Stay Updated with Industry Insights
              </h3>
              <p className="text-white/60 max-w-lg">
                Subscribe to our newsletter for the latest trends, case studies, and technology updates.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-6 py-4 bg-cyan-500/20 rounded-xl border border-cyan-500/30"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="text-cyan-300 font-medium">Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://oceanbluecorp.com/images/logo-oc.png"
                alt="Ocean Blue Corporation"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed text-sm md:text-base">
              Empowering enterprises with streamlined tech solutions. Specializing in
              ERP, Salesforce, Cloud, and staffing expertise.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hr@oceanbluecorp.com"
                className="flex items-center gap-3 text-white/60 hover:text-cyan-400 transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hr@oceanbluecorp.com</span>
              </a>
              <a
                href="tel:+16148446925"
                className="flex items-center gap-3 text-white/60 hover:text-cyan-400 transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 614-844-6925</span>
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>
                  9775 Fairway Drive, Suite C<br />
                  Powell, OH 43065
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Resources</h3>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Legal</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h3 className="font-semibold text-white mb-4 text-sm md:text-base">Follow Us</h3>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Ocean Blue Corporation. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span className="hidden sm:inline">Innovation</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500 hidden sm:block" />
              <span className="hidden sm:inline">Dedication</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500 hidden sm:block" />
              <span className="hidden sm:inline">Excellence</span>
              <span className="w-1 h-1 rounded-full bg-cyan-500 hidden sm:block" />
              <span className="hidden sm:inline">Commitment</span>
              <span className="sm:hidden">IDEC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
