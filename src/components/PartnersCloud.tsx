"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "Ohio", logo: "https://development.ohio.gov/wps/wcm/connect/gov/7efff5ea-f9fd-4c0f-9a71-401183103f50/development-logo.png?MOD=AJPERES" },
  { name: "HGS", logo: "/hgs.svg" },
  { name: "Dieboldnixdorf", logo: "https://www.dieboldnixdorf.com/-/media/diebold/images/global/logo/dn-color-logo.svg" },
  { name: "Satyawholesale", logo: "https://www.satyawholesalers.com/_next/image?url=https%3A%2F%2Fsatyawholesalers.net%2Fstorage%2F3288%2Fsatya-wholesale-logo-(1).png&w=1920&q=75" },
  { name: "CityBarbeque", logo: "/citybarbeque.svg" },
  { name: "Tacos", logo: "/tacos.png" },
];

const techPartners = [
  { name: "NMSDC", logo: "/NMSDC.png" },
  { name: "Ohio WBE", logo: "/wbe.png" },
  { name: "Ohio MBE", logo: "/ohiombe.png" },
  { name: "MBE", logo: "/mbe.png" },
];

export default function PartnersCloud() {
  return (
    <section className="py-20 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 font-[family-name:var(--font-space-grotesk)]">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-medium">
              industry leaders
            </span>
          </h2>
          <p className="text-gray-500">Building partnerships that drive innovation</p>
        </motion.div>

        {/* Client logos - Floating cloud layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main partners grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center drop-shadow-2xl"
              >
                <div className="group relative p-4 md:p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 w-full aspect-[3/2] flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={50}
                    className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
                    unoptimized
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology partners */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4">We are Certified by</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {techPartners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white transition-all duration-300 min-w-[140px] md:min-w-[180px]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={50}
                      className="h-10 md:h-18 w-auto object-contain mx-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      unoptimized
                    />
                    <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                      {partner.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
