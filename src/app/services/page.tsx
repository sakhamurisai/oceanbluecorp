"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Database,
  Users,
  GraduationCap,
  Cpu,
  BarChart3,
  CheckCircle2,
  Layers,
  Shield,
  Zap,
  Clock,
  Award,
  Headphones,
  Target,
  TrendingUp,
  Settings,
  Code,
  LineChart,
  Briefcase,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "erp",
    icon: BarChart3,
    title: "ERP Solutions",
    subtitle: "Enterprise Resource Planning",
    description:
      "Transform your business operations with industry-leading ERP implementations. We specialize in SAP, Oracle, and Microsoft Dynamics deployments tailored to your unique requirements.",
    features: [
      "SAP S/4HANA Implementation & Migration",
      "Oracle Cloud ERP Solutions",
      "Microsoft Dynamics 365",
      "Custom ERP Development",
      "Legacy System Modernization",
      "ERP Integration Services",
    ],
    benefits: [
      { icon: TrendingUp, text: "40% improvement in operational efficiency" },
      { icon: Clock, text: "50% faster reporting and analytics" },
      { icon: Shield, text: "Enhanced compliance and security" },
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Services",
    subtitle: "Cloud Migration & Management",
    description:
      "Accelerate your digital transformation with enterprise-grade cloud solutions. Our certified experts deliver seamless migrations and ongoing management across AWS, Azure, and GCP.",
    features: [
      "Cloud Strategy & Assessment",
      "Migration Planning & Execution",
      "Multi-Cloud Architecture",
      "Cloud Security & Compliance",
      "DevOps & CI/CD Implementation",
      "Cost Optimization & FinOps",
    ],
    benefits: [
      { icon: Zap, text: "99.99% uptime guarantee" },
      { icon: TrendingUp, text: "30% reduction in infrastructure costs" },
      { icon: Layers, text: "Infinite scalability on demand" },
    ],
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "ai",
    icon: Cpu,
    title: "Data & AI",
    subtitle: "AI & Machine Learning Solutions",
    description:
      "Unlock the power of your data with advanced analytics and AI-driven solutions. From predictive modeling to intelligent automation, we help you make smarter decisions faster.",
    features: [
      "Machine Learning Model Development",
      "Predictive Analytics & Forecasting",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Data Engineering & Pipelines",
      "Business Intelligence & Dashboards",
    ],
    benefits: [
      { icon: Target, text: "95%+ prediction accuracy" },
      { icon: Clock, text: "10x faster data processing" },
      { icon: LineChart, text: "Data-driven decision making" },
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "salesforce",
    icon: Database,
    title: "Salesforce",
    subtitle: "CRM Implementation & Consulting",
    description:
      "Maximize your CRM investment with expert Salesforce consulting. From implementation to customization, we help you build stronger customer relationships and drive revenue growth.",
    features: [
      "Sales Cloud Implementation",
      "Service Cloud Solutions",
      "Marketing Cloud Integration",
      "Custom App Development",
      "Lightning Migration",
      "Salesforce CPQ & Billing",
    ],
    benefits: [
      { icon: TrendingUp, text: "35% increase in sales productivity" },
      { icon: Headphones, text: "Improved customer satisfaction" },
      { icon: Settings, text: "360-degree customer view" },
    ],
    color: "from-sky-500 to-sky-600",
  },
  {
    id: "staffing",
    icon: Users,
    title: "IT Staffing",
    subtitle: "Talent Acquisition & Managed Teams",
    description:
      "Access top-tier IT talent through our comprehensive staffing solutions. Whether you need contract resources, direct hires, or fully managed teams, we deliver the expertise you need.",
    features: [
      "Contract Staffing",
      "Contract-to-Hire",
      "Direct Placement",
      "Managed Development Teams",
      "Staff Augmentation",
      "Executive Search",
    ],
    benefits: [
      { icon: Clock, text: "48-hour candidate presentation" },
      { icon: Award, text: "Pre-vetted top 5% talent" },
      { icon: Briefcase, text: "Flexible engagement models" },
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Corporate Training",
    subtitle: "Professional Development Programs",
    description:
      "Empower your workforce with industry-leading training programs. Our comprehensive curriculum covers the latest technologies and certifications to keep your team ahead of the curve.",
    features: [
      "Technology Certification Programs",
      "Custom Corporate Training",
      "Leadership Development",
      "E-Learning Platform Access",
      "Hands-on Labs & Workshops",
      "Mentorship Programs",
    ],
    benefits: [
      { icon: BookOpen, text: "200+ courses available" },
      { icon: Award, text: "Industry-recognized certifications" },
      { icon: Code, text: "Practical, hands-on learning" },
    ],
    color: "from-orange-500 to-orange-600",
  },
];

const industries = [
  "Financial Services",
  "Healthcare & Life Sciences",
  "Manufacturing",
  "Retail & Consumer",
  "Technology",
  "Energy & Utilities",
  "Government",
  "Professional Services",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1e3a8a] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-20 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/90">Our Services</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Enterprise IT Solutions That{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
                Drive Results
              </span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              From strategy to implementation, we deliver comprehensive technology
              solutions that transform businesses. Our expertise spans ERP, Cloud,
              AI, CRM, and beyond.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Navigation */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-[64px] md:top-[80px] z-40 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service, index) => (
              <motion.a
                key={service.id}
                href={`#${service.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <service.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{service.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 md:py-24 lg:py-32 relative overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
        >
          {/* Floating orb background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className={`absolute ${index % 2 === 0 ? "top-20 -right-20" : "bottom-20 -left-20"} w-[400px] h-[400px] bg-gradient-to-br ${service.color.replace('500', '200').replace('600', '200')} rounded-full blur-3xl pointer-events-none`}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 0 ? "" : "lg:order-2"}
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-medium mb-6 shadow-lg`}
                >
                  <service.icon className="w-4 h-4" />
                  {service.subtitle}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6">
                  {service.title}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{service.description}</p>

                <div className="space-y-4 mb-8">
                  {service.benefits.map((benefit, i) => (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={index % 2 === 0 ? "" : "lg:order-1"}
              >
                <div className="relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${service.color} opacity-[0.06] group-hover:opacity-[0.1] transition-opacity rounded-tr-3xl`} />

                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </span>
                    What We Offer
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none rounded-3xl`} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Industries Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-60 h-60 md:w-80 md:h-80 bg-blue-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-60 h-60 md:w-80 md:h-80 bg-cyan-500/15 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-[0.2em] mb-4 block"
            >
              Industries
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6"
            >
              Trusted Across{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
                Industries
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg"
            >
              We bring deep domain expertise to every engagement, delivering
              solutions tailored to your industry&apos;s unique challenges.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all border border-white/10 hover:border-white/20 group cursor-pointer"
              >
                <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 -left-20 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 -right-20 w-[300px] h-[300px] bg-cyan-200 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Decorative corners */}
          <div className="relative mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -top-8 left-0 w-24 h-24 md:w-32 md:h-32 border-l-2 border-t-2 border-gray-200 rounded-tl-3xl hidden sm:block"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 right-0 w-24 h-24 md:w-32 md:h-32 border-r-2 border-b-2 border-gray-200 rounded-br-3xl hidden sm:block"
            />

            <div className="text-center max-w-3xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-[0.2em] mb-4 block"
              >
                Our Process
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6"
              >
                A Proven Approach to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                    Success
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 to-cyan-200 opacity-40 -z-0 rounded-full"
                    style={{ originX: 0 }}
                  />
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg"
              >
                Our methodology ensures consistent, high-quality delivery across
                all engagements, from initial assessment to ongoing support.
              </motion.p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We analyze your current state, understand your goals, and identify opportunities for improvement.",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                step: "02",
                title: "Strategy",
                description:
                  "We develop a comprehensive roadmap with clear milestones, timelines, and success metrics.",
                gradient: "from-indigo-600 to-purple-600",
              },
              {
                step: "03",
                title: "Implementation",
                description:
                  "Our expert teams execute the plan using agile methodologies and proven best practices.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                step: "04",
                title: "Optimization",
                description:
                  "We provide ongoing support, monitoring, and continuous improvement to maximize ROI.",
                gradient: "from-emerald-500 to-teal-500",
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center overflow-hidden">
                  {/* Corner accent */}
                  <div className={`absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${phase.gradient} opacity-[0.06] group-hover:opacity-[0.1] transition-opacity rounded-tl-3xl`} />

                  {/* Step number */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{phase.title}</h3>
                  <p className="text-gray-500">{phase.description}</p>

                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none rounded-3xl`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl border border-gray-200 p-8 md:p-16 text-center shadow-sm overflow-hidden"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-[0.04] rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-[0.04] rounded-br-3xl" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                Transform
              </span>{" "}
              Your Business?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your challenges and explore how our services can
              help you achieve your goals. Schedule a free consultation with our
              experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
