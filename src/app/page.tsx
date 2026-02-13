import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import {
  ArrowRight,
  Cloud,
  Database,
  Users,
  GraduationCap,
  Cpu,
  BarChart3,
  CheckCircle2,
  Globe,
  Award,
  Building2,
  Shield,
  Zap,
  HeartHandshake,
  TrendingUp,
  Star,
  Settings,
  Headphones,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "ERP Solutions",
    description:
      "SAP & Oracle implementation tailored to streamline your business operations and maximize efficiency.",
    features: ["SAP S/4HANA", "Oracle Cloud ERP", "Microsoft Dynamics 365"],
    href: "/services#erp",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "Secure, scalable cloud migration and management solutions on AWS, Azure, and GCP.",
    features: ["Cloud Migration", "Infrastructure Management", "DevOps"],
    href: "/services#cloud",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Cpu,
    title: "Data Analytics & AI",
    description:
      "Unlock actionable insights with advanced analytics, machine learning, and AI solutions.",
    features: ["Machine Learning", "Predictive Analytics", "Business Intelligence"],
    href: "/services#ai",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Database,
    title: "Salesforce",
    description:
      "Transform customer engagement through intelligent Salesforce solutions—smart, simple, effective.",
    features: ["Sales Cloud", "Service Cloud", "Marketing Cloud"],
    href: "/services#salesforce",
    color: "from-sky-500 to-sky-600",
  },
  {
    icon: Users,
    title: "Staffing Services",
    description:
      "Access top-tier IT talent with our comprehensive staffing solutions for all engagement models.",
    features: ["Contract Staffing", "Direct Hire", "Managed Teams"],
    href: "/services#staffing",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: GraduationCap,
    title: "Training Services",
    description:
      "Empower your workforce with industry-leading certification programs and custom training.",
    features: ["IT Certifications", "Custom Programs", "E-Learning"],
    href: "/services#training",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Settings,
    title: "Managed Services",
    description:
      "End-to-end IT management and support to keep your business running smoothly 24/7.",
    features: ["IT Support", "Infrastructure Management", "Security"],
    href: "/services#managed",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: Headphones,
    title: "Outsourcing",
    description:
      "Strategic outsourcing solutions to optimize costs and focus on your core business.",
    features: ["BPO Services", "IT Outsourcing", "Process Optimization"],
    href: "/services#outsourcing",
    color: "from-indigo-500 to-indigo-600",
  },
];

const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Building2 },
  { value: "15+", label: "Years of Excellence", icon: Award },
  { value: "25+", label: "Global Locations", icon: Globe },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const industries = [
  "Manufacturing",
  "Retail",
  "Government",
  "Healthcare",
  "Financial Services",
  "Technology",
];

const values = [
  {
    icon: Star,
    title: "Your Success, Our Priority",
    description: "We measure our success by yours, delivering solutions that drive real business outcomes.",
  },
  {
    icon: HeartHandshake,
    title: "Building Lasting Partnerships",
    description: "We don't just complete projects—we build long-term relationships based on trust.",
  },
  {
    icon: Shield,
    title: "Unwavering Customer Support",
    description: "24/7 dedicated support ensuring your systems run smoothly at all times.",
  },
  {
    icon: Zap,
    title: "Innovation & Excellence",
    description: "Continuously pushing boundaries with cutting-edge technology solutions.",
  },
];

const testimonials = [
  {
    quote:
      "Ocean Blue transformed our entire ERP infrastructure. Their expertise in SAP implementation was instrumental in achieving a 40% improvement in operational efficiency.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechForward Inc.",
  },
  {
    quote:
      "The Salesforce implementation was seamless. Their team understood our requirements and delivered a solution that exceeded our expectations.",
    author: "Michael Rodriguez",
    role: "VP of Sales",
    company: "Global Retail Corp",
  },
  {
    quote:
      "Their AI and data analytics solutions have given us unprecedented visibility into our operations. The ROI has been phenomenal.",
    author: "Jennifer Walsh",
    role: "Director of Operations",
    company: "Manufacturing Solutions",
  },
];

const partners = [
  "SAP",
  "Oracle",
  "Microsoft",
  "Salesforce",
  "AWS",
  "Google Cloud",
];

export default function Home() {
  return (
    <>
      {/* Hero Carousel */}
      <section>
        <HeroCarousel />
      </section>
      

      {/* Partners Section */}
      <section className="py-10 bg-white border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <p className="text-muted-foreground font-medium whitespace-nowrap text-sm uppercase tracking-wider">
              Trusted Technology Partners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-primary transition-colors cursor-pointer"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-b from-white to-slate-50" id="services">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Our Services
            </span>
            <h2 className="heading-lg mb-6">
              Comprehensive IT Solutions for Modern Enterprises
            </h2>
            <p className="text-body">
              From legacy system modernization to cutting-edge AI implementation,
              we provide end-to-end solutions that drive business growth and operational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative bg-white rounded-2xl border border-border p-6 card-hover overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-[#0a1628] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 font-semibold text-sm rounded-full mb-4">
                Why Ocean Blue
              </span>
              <h2 className="heading-lg mb-6">
                Personalized Solutions Every Time
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Specializing in ERP, staffing, and Salesforce expertise for Manufacturing,
                Retail, and Government sectors. We deliver tailored solutions that integrate
                seamlessly with your existing infrastructure.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{value.title}</h4>
                      <p className="text-sm text-white/60">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <p className="text-sm text-white/50">Project Success Rate</p>
                    <p className="text-4xl font-bold text-white">98.7%</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/70">ERP Implementations</span>
                      <span className="text-sm text-cyan-400">95%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[95%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/70">Salesforce Projects</span>
                      <span className="text-sm text-cyan-400">99%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[99%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-white/70">Cloud Migrations</span>
                      <span className="text-sm text-cyan-400">97%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[97%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link href="/contact" className="w-full btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center justify-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Industries We Serve
            </span>
            <h2 className="heading-lg mb-6">
              Tailored Solutions for Your Sector
            </h2>
            <p className="text-body">
              Deep domain expertise across key industries, delivering solutions
              that address your unique challenges and opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="bg-white rounded-xl border border-border p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
              >
                <Building2 className="w-8 h-8 text-muted-foreground group-hover:text-primary mx-auto mb-3 transition-colors" />
                <span className="font-medium text-sm group-hover:text-primary transition-colors">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="heading-lg mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-body">
              See what our clients say about their transformational journey with Ocean Blue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl border border-border p-8 card-hover relative"
              >
                <div className="absolute top-6 right-6 text-6xl text-primary/10 font-serif">&ldquo;</div>

                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-foreground mb-8 leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#0a1628] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join 500+ enterprises that have accelerated their digital transformation
              with Ocean Blue. Let&apos;s discuss how we can help you achieve your business goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 inline-flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 inline-flex items-center justify-center"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              <a href="tel:+16148446925" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                +1 614-844-6925
              </a>
              <a href="mailto:hr@oceanbluecorp.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                hr@oceanbluecorp.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Powell, OH 43065
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
