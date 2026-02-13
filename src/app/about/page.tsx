import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Award,
  Globe,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Our Story, Mission & Values",
  description:
    "Learn about Ocean Blue Corporation's 15+ year journey in enterprise IT solutions. Discover our mission, values, leadership team, and commitment to transforming businesses worldwide.",
  openGraph: {
    title: "About Ocean Blue Corporation",
    description:
      "15+ years of excellence in enterprise IT solutions. Meet our team and discover our mission.",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously push boundaries, embracing new technologies and methodologies to deliver cutting-edge solutions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We build trust through transparency, ethical practices, and unwavering commitment to our clients' success.",
  },
  {
    icon: Heart,
    title: "Client Focus",
    description:
      "Our clients' goals are our goals. We partner closely to understand needs and deliver exceptional outcomes.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from project delivery to customer service.",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Foundation",
    description: "Ocean Blue Corporation founded with a vision to transform enterprise IT",
  },
  {
    year: "2013",
    title: "First 100 Clients",
    description: "Reached milestone of 100 enterprise clients across North America",
  },
  {
    year: "2016",
    title: "Global Expansion",
    description: "Opened offices in Europe and Asia Pacific regions",
  },
  {
    year: "2019",
    title: "AI Practice Launch",
    description: "Established dedicated AI and Machine Learning practice",
  },
  {
    year: "2022",
    title: "500+ Clients",
    description: "Serving over 500 enterprise clients globally",
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description: "Recognized as a leader in enterprise digital transformation",
  },
];

const leadership = [
  {
    name: "David Mitchell",
    role: "CEO & Founder",
    bio: "25+ years in enterprise technology. Former SVP at a Fortune 100 tech company.",
    initials: "DM",
  },
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    bio: "Cloud architecture expert with patents in distributed systems.",
    initials: "SC",
  },
  {
    name: "Robert Williams",
    role: "Chief Operating Officer",
    bio: "Operations leader with expertise in scaling global teams.",
    initials: "RW",
  },
  {
    name: "Emily Torres",
    role: "Chief Revenue Officer",
    bio: "Enterprise sales veteran with track record of 300% growth.",
    initials: "ET",
  },
];

const stats = [
  { value: "500+", label: "Enterprise Clients", icon: Building2 },
  { value: "2,500+", label: "Team Members", icon: Users },
  { value: "25+", label: "Global Offices", icon: Globe },
  { value: "98%", label: "Client Retention", icon: TrendingUp },
];

export default function AboutPage() {
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
            <p className="text-cyan-300 font-semibold mb-4">About Us</p>
            <h1 className="heading-xl text-white mb-6">
              Transforming Enterprises Through Technology Since 2010
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We are a global technology company dedicated to helping enterprises
              navigate digital transformation with confidence. Our mission is to
              deliver innovative solutions that drive measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
              <div className="w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="heading-md mb-4">Our Mission</h2>
              <p className="text-body leading-relaxed">
                To empower enterprises worldwide with innovative technology solutions
                that accelerate growth, enhance efficiency, and create lasting
                competitive advantages. We are committed to being the trusted partner
                that guides organizations through their digital transformation journey.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
              <div className="w-14 h-14 rounded-xl gradient-ocean flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="heading-md mb-4">Our Vision</h2>
              <p className="text-body leading-relaxed">
                To be the global leader in enterprise digital transformation,
                recognized for our innovative solutions, exceptional talent, and
                unwavering commitment to client success. We envision a world where
                every enterprise can harness the full potential of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold mb-4">Our Values</p>
            <h2 className="heading-lg mb-6">The Principles That Guide Us</h2>
            <p className="text-body">
              Our core values shape every interaction, decision, and solution we deliver.
              They are the foundation of our culture and our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl border border-border p-8 text-center card-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold mb-4">Our Journey</p>
            <h2 className="heading-lg mb-6">Milestones That Define Us</h2>
            <p className="text-body">
              From our humble beginnings to becoming a global leader, every milestone
              represents our commitment to growth and excellence.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`lg:flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-1/2 lg:px-12">
                    <div
                      className={`bg-card rounded-2xl border border-border p-6 card-hover ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <span className="text-primary font-bold text-lg">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-12 h-12 rounded-full gradient-ocean items-center justify-center z-10 mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>

                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold mb-4">Leadership</p>
            <h2 className="heading-lg mb-6">Meet Our Executive Team</h2>
            <p className="text-body">
              Our leadership team brings decades of combined experience in enterprise
              technology, driving innovation and growth across the organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <div
                key={leader.name}
                className="bg-card rounded-2xl border border-border p-8 text-center card-hover"
              >
                <div className="w-24 h-24 rounded-full gradient-ocean flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {leader.initials}
                </div>
                <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                <p className="text-primary font-medium mb-4">{leader.role}</p>
                <p className="text-sm text-muted-foreground">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding gradient-ocean text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-cyan-300 font-semibold mb-4">Global Presence</p>
              <h2 className="heading-lg mb-6">Serving Enterprises Worldwide</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                With offices across North America, Europe, and Asia Pacific, we
                provide local expertise with global capabilities. Our distributed
                teams work around the clock to ensure seamless service delivery.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold mb-2">12</p>
                  <p className="text-white/70">Americas</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">8</p>
                  <p className="text-white/70">Europe</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">5</p>
                  <p className="text-white/70">Asia Pacific</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-white/10 rounded-2xl flex items-center justify-center">
                <Globe className="w-32 h-32 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="bg-card rounded-3xl border border-border p-8 md:p-16 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-ocean flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="heading-lg mb-4">Join Our Journey</h2>
            <p className="text-body max-w-2xl mx-auto mb-8">
              Whether you&apos;re looking for a technology partner or an exciting career
              opportunity, we&apos;d love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/careers" className="btn-secondary inline-flex items-center justify-center">
                View Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
