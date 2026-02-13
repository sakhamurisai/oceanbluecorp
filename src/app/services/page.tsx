import { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise IT Services - ERP, Cloud, AI, Salesforce & More",
  description:
    "Explore Ocean Blue Corporation's comprehensive enterprise IT services including ERP implementation, cloud migration, AI & data analytics, Salesforce consulting, IT staffing, and corporate training.",
  openGraph: {
    title: "Enterprise IT Services | Ocean Blue Corporation",
    description:
      "Comprehensive IT solutions for modern enterprises: ERP, Cloud, AI, Salesforce, Staffing & Training.",
  },
};

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
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="text-cyan-300 font-semibold mb-4">Our Services</p>
            <h1 className="heading-xl text-white mb-6">
              Enterprise IT Solutions That Drive Results
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              From strategy to implementation, we deliver comprehensive technology
              solutions that transform businesses. Our expertise spans ERP, Cloud,
              AI, CRM, and beyond.
            </p>
            <Link
              href="/contact"
              className="btn-primary bg-white text-primary hover:bg-white/90 inline-flex items-center gap-2"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Navigation */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <service.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{service.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-medium mb-6`}
                >
                  <service.icon className="w-4 h-4" />
                  {service.subtitle}
                </div>
                <h2 className="heading-lg mb-6">{service.title}</h2>
                <p className="text-body mb-8">{service.description}</p>

                <div className="space-y-4 mb-8">
                  {service.benefits.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className={index % 2 === 0 ? "" : "lg:order-1"}>
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    What We Offer
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Industries Section */}
      <section className="section-padding gradient-ocean text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-cyan-300 font-semibold mb-4">Industries</p>
            <h2 className="heading-lg mb-6">
              Trusted Across Industries
            </h2>
            <p className="text-white/80 text-lg">
              We bring deep domain expertise to every engagement, delivering
              solutions tailored to your industry&apos;s unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors"
              >
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold mb-4">Our Process</p>
            <h2 className="heading-lg mb-6">
              A Proven Approach to Success
            </h2>
            <p className="text-body">
              Our methodology ensures consistent, high-quality delivery across
              all engagements, from initial assessment to ongoing support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We analyze your current state, understand your goals, and identify opportunities for improvement.",
              },
              {
                step: "02",
                title: "Strategy",
                description:
                  "We develop a comprehensive roadmap with clear milestones, timelines, and success metrics.",
              },
              {
                step: "03",
                title: "Implementation",
                description:
                  "Our expert teams execute the plan using agile methodologies and proven best practices.",
              },
              {
                step: "04",
                title: "Optimization",
                description:
                  "We provide ongoing support, monitoring, and continuous improvement to maximize ROI.",
              },
            ].map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-ocean flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="bg-card rounded-3xl border border-border p-8 md:p-16 text-center">
            <h2 className="heading-lg mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-body max-w-2xl mx-auto mb-8">
              Let&apos;s discuss your challenges and explore how our services can
              help you achieve your goals. Schedule a free consultation with our
              experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-secondary inline-flex items-center justify-center">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
