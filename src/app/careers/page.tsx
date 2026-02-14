"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Heart,
  GraduationCap,
  Plane,
  Laptop,
  Coffee,
  Users,
  Building2,
  Zap,
  Target,
  Award,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  CheckCircle2,
  Globe,
  Calendar,
  Bookmark,
  Share2,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Annual learning budget and access to certification programs",
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Industry-leading salaries with performance bonuses and equity",
  },
  {
    icon: Plane,
    title: "Flexible PTO",
    description: "Generous paid time off plus company holidays and wellness days",
  },
  {
    icon: Laptop,
    title: "Remote-First Culture",
    description: "Work from anywhere with flexible hybrid arrangements",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours and support for your personal commitments",
  },
];

const openings = [
  {
    id: 1,
    title: "Senior SAP S/4HANA Consultant",
    department: "ERP Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$150,000 - $200,000",
    posted: "2 days ago",
    description: "We are seeking an experienced SAP S/4HANA Consultant to lead enterprise implementations for our Fortune 500 clients. You will work closely with business stakeholders to design, configure, and deploy SAP solutions that drive digital transformation.",
    responsibilities: [
      "Lead end-to-end SAP S/4HANA implementation projects",
      "Configure and customize SAP modules based on business requirements",
      "Conduct workshops and gather requirements from stakeholders",
      "Provide technical guidance and mentorship to junior consultants",
      "Collaborate with cross-functional teams to ensure successful delivery",
    ],
    requirements: [
      "8+ years of SAP implementation experience",
      "SAP S/4HANA certification required",
      "Strong knowledge of at least 2 SAP modules (MM, SD, FI/CO, PP)",
      "Excellent communication and presentation skills",
      "Experience with Agile methodologies",
    ],
  },
  {
    id: 2,
    title: "Cloud Solutions Architect",
    department: "Cloud Services",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$160,000 - $220,000",
    posted: "3 days ago",
    description: "Join our Cloud Services team to design and implement enterprise-scale cloud solutions on AWS, Azure, and GCP. You will be responsible for architecting secure, scalable, and cost-effective cloud infrastructures.",
    responsibilities: [
      "Design cloud architecture solutions for enterprise clients",
      "Lead cloud migration and modernization initiatives",
      "Implement infrastructure as code using Terraform or CloudFormation",
      "Ensure security best practices and compliance requirements",
      "Optimize cloud costs and performance",
    ],
    requirements: [
      "7+ years of cloud architecture experience",
      "AWS Solutions Architect Professional or equivalent certification",
      "Strong knowledge of networking, security, and DevOps practices",
      "Experience with containerization (Docker, Kubernetes)",
      "Excellent problem-solving skills",
    ],
  },
  {
    id: 3,
    title: "Machine Learning Engineer",
    department: "Data & AI",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    remote: true,
    salary: "$140,000 - $190,000",
    posted: "1 week ago",
    description: "We're looking for a Machine Learning Engineer to develop and deploy AI/ML solutions for our enterprise clients. You will work on cutting-edge projects involving NLP, computer vision, and predictive analytics.",
    responsibilities: [
      "Develop and deploy machine learning models at scale",
      "Build data pipelines for model training and inference",
      "Collaborate with data scientists and engineers",
      "Optimize models for production environments",
      "Stay current with latest ML research and techniques",
    ],
    requirements: [
      "5+ years of ML engineering experience",
      "Proficiency in Python, TensorFlow/PyTorch",
      "Experience with MLOps and model deployment",
      "Strong mathematical foundation",
      "Experience with cloud ML services (SageMaker, Vertex AI)",
    ],
  },
  {
    id: 4,
    title: "Salesforce Developer",
    department: "Salesforce",
    location: "Austin, TX",
    type: "Full-time",
    level: "Mid",
    remote: true,
    salary: "$100,000 - $140,000",
    posted: "4 days ago",
    description: "Join our Salesforce practice to build custom solutions on the Salesforce platform. You will develop Lightning components, Apex code, and integrations to extend Salesforce capabilities for our clients.",
    responsibilities: [
      "Develop custom Salesforce solutions using Apex and Lightning",
      "Build integrations with external systems",
      "Participate in technical design and code reviews",
      "Write unit tests and maintain code quality",
      "Support production deployments and troubleshooting",
    ],
    requirements: [
      "3+ years of Salesforce development experience",
      "Salesforce Platform Developer certification",
      "Strong Apex, LWC, and Visualforce skills",
      "Experience with REST/SOAP APIs",
      "Knowledge of Salesforce best practices",
    ],
  },
  {
    id: 5,
    title: "Technical Recruiter",
    department: "IT Staffing",
    location: "Chicago, IL",
    type: "Full-time",
    level: "Mid",
    remote: false,
    salary: "$70,000 - $100,000",
    posted: "1 week ago",
    description: "We are seeking a Technical Recruiter to join our Staffing Services team. You will source, screen, and place top IT talent with our enterprise clients across various technology domains.",
    responsibilities: [
      "Source candidates through various channels",
      "Screen and interview technical candidates",
      "Build relationships with hiring managers",
      "Manage candidate pipeline and ATS",
      "Meet placement targets and metrics",
    ],
    requirements: [
      "3+ years of technical recruiting experience",
      "Knowledge of IT technologies and roles",
      "Strong communication and negotiation skills",
      "Experience with ATS and recruiting tools",
      "Ability to work in fast-paced environment",
    ],
  },
  {
    id: 6,
    title: "Corporate Trainer - Cloud Technologies",
    department: "Training",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$90,000 - $130,000",
    posted: "5 days ago",
    description: "Lead our cloud technology training programs and help organizations upskill their workforce. You will design and deliver training on AWS, Azure, and GCP to enterprise clients.",
    responsibilities: [
      "Design and deliver cloud training programs",
      "Create training materials and assessments",
      "Customize training for client needs",
      "Stay current with cloud certifications",
      "Mentor junior trainers",
    ],
    requirements: [
      "5+ years of cloud technology experience",
      "Multiple cloud certifications (AWS, Azure, GCP)",
      "Experience in corporate training",
      "Excellent presentation skills",
      "Ability to explain complex concepts simply",
    ],
  },
  {
    id: 7,
    title: "DevOps Engineer",
    department: "Cloud Services",
    location: "Seattle, WA",
    type: "Full-time",
    level: "Mid-Senior",
    remote: true,
    salary: "$130,000 - $170,000",
    posted: "3 days ago",
    description: "Join our DevOps team to build and maintain CI/CD pipelines, automate infrastructure, and enable rapid software delivery for our enterprise clients.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Automate infrastructure provisioning",
      "Implement monitoring and alerting solutions",
      "Ensure security and compliance",
      "Collaborate with development teams",
    ],
    requirements: [
      "5+ years of DevOps experience",
      "Strong Kubernetes and Docker skills",
      "Experience with GitOps workflows",
      "Knowledge of security best practices",
      "Infrastructure as Code experience",
    ],
  },
  {
    id: 8,
    title: "Data Engineer",
    department: "Data & AI",
    location: "Boston, MA",
    type: "Full-time",
    level: "Mid",
    remote: true,
    salary: "$110,000 - $150,000",
    posted: "1 week ago",
    description: "Build and maintain data infrastructure to enable analytics and machine learning. You will work with big data technologies to process and transform data at scale.",
    responsibilities: [
      "Design and build data pipelines",
      "Implement data warehousing solutions",
      "Ensure data quality and governance",
      "Optimize data processing performance",
      "Collaborate with data scientists",
    ],
    requirements: [
      "4+ years of data engineering experience",
      "Strong SQL and Python skills",
      "Experience with Spark, Airflow, or similar",
      "Knowledge of data warehousing concepts",
      "Cloud data platform experience",
    ],
  },
  {
    id: 9,
    title: "Project Manager - Enterprise Solutions",
    department: "PMO",
    location: "Denver, CO",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$120,000 - $160,000",
    posted: "2 days ago",
    description: "Lead complex enterprise IT projects from initiation to delivery. You will manage cross-functional teams, stakeholder relationships, and ensure projects are delivered on time and within budget.",
    responsibilities: [
      "Manage end-to-end project delivery",
      "Develop project plans and schedules",
      "Lead and motivate project teams",
      "Manage risks and issues",
      "Communicate with stakeholders",
    ],
    requirements: [
      "7+ years of IT project management experience",
      "PMP certification required",
      "Experience with enterprise implementations",
      "Strong leadership and communication skills",
      "Agile/Scrum experience preferred",
    ],
  },
  {
    id: 10,
    title: "Senior Oracle DBA",
    department: "ERP Solutions",
    location: "Phoenix, AZ",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$130,000 - $170,000",
    posted: "6 days ago",
    description: "Manage and optimize Oracle database environments for enterprise clients. You will ensure database performance, security, and availability for mission-critical systems.",
    responsibilities: [
      "Manage Oracle database environments",
      "Performance tuning and optimization",
      "Implement backup and recovery strategies",
      "Ensure database security",
      "Support application teams",
    ],
    requirements: [
      "8+ years of Oracle DBA experience",
      "Oracle certification preferred",
      "RAC and Data Guard experience",
      "Strong PL/SQL skills",
      "Cloud database experience (OCI, AWS RDS)",
    ],
  },
  {
    id: 11,
    title: "Business Analyst - Manufacturing",
    department: "ERP Solutions",
    location: "Detroit, MI",
    type: "Full-time",
    level: "Mid",
    remote: false,
    salary: "$85,000 - $115,000",
    posted: "4 days ago",
    description: "Work with manufacturing clients to analyze business processes and translate requirements into technical solutions. You will bridge the gap between business and technology teams.",
    responsibilities: [
      "Gather and document requirements",
      "Analyze business processes",
      "Create functional specifications",
      "Support testing and validation",
      "Facilitate stakeholder workshops",
    ],
    requirements: [
      "4+ years of business analysis experience",
      "Manufacturing domain knowledge",
      "ERP implementation experience",
      "Strong analytical skills",
      "Excellent documentation skills",
    ],
  },
  {
    id: 12,
    title: "Security Consultant",
    department: "Cloud Services",
    location: "Washington, DC",
    type: "Full-time",
    level: "Senior",
    remote: true,
    salary: "$140,000 - $180,000",
    posted: "1 week ago",
    description: "Help enterprise clients secure their cloud and on-premise environments. You will assess security posture, design solutions, and implement security controls.",
    responsibilities: [
      "Conduct security assessments",
      "Design security architectures",
      "Implement security controls",
      "Develop security policies",
      "Respond to security incidents",
    ],
    requirements: [
      "7+ years of security experience",
      "CISSP or equivalent certification",
      "Cloud security experience",
      "Knowledge of compliance frameworks",
      "Strong technical skills",
    ],
  },
];

const departments = ["All Departments", "ERP Solutions", "Cloud Services", "Data & AI", "Salesforce", "IT Staffing", "Training", "PMO"];
const levels = ["All Levels", "Junior", "Mid", "Mid-Senior", "Senior"];
const locations = ["All Locations", "Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Chicago, IL", "Seattle, WA", "Boston, MA", "Denver, CO", "Phoenix, AZ", "Detroit, MI", "Washington, DC"];
const types = ["All Types", "Full-time", "Part-time", "Contract"];

const ITEMS_PER_PAGE = 6;

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Push boundaries and embrace new technologies",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work together to achieve extraordinary results",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Maintain the highest standards in everything we do",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Build trust through transparency and ethical practices",
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof openings[0] | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return openings.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
      const matchesLevel = selectedLevel === "All Levels" || job.level === selectedLevel;
      const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
      const matchesType = selectedType === "All Types" || job.type === selectedType;
      const matchesRemote = !remoteOnly || job.remote;

      return matchesSearch && matchesDepartment && matchesLevel && matchesLocation && matchesType && matchesRemote;
    });
  }, [searchQuery, selectedDepartment, selectedLevel, selectedLocation, selectedType, remoteOnly]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All Departments");
    setSelectedLevel("All Levels");
    setSelectedLocation("All Locations");
    setSelectedType("All Types");
    setRemoteOnly(false);
    setCurrentPage(1);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplicationSubmitted(false);
      setResumeFile(null);
      setSelectedJob(null);
    }, 2000);
  };

  const activeFiltersCount = [
    selectedDepartment !== "All Departments",
    selectedLevel !== "All Levels",
    selectedLocation !== "All Locations",
    selectedType !== "All Types",
    remoteOnly,
  ].filter(Boolean).length;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-400 font-semibold mb-4"
            >
              Careers at Ocean Blue
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6"
            >
              Build Your Future With Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 md:mb-8"
            >
              Join a team of innovators, problem-solvers, and technology experts
              who are shaping the future of enterprise IT. Discover your potential
              at Ocean Blue Corporation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 md:gap-6 text-slate-300"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span>500+ Employees</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>25+ Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>{openings.length} Open Positions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture & Values Section */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Where Innovation Meets Opportunity
              </h2>
              <p className="text-slate-600 mb-6 md:mb-8 leading-relaxed">
                At Ocean Blue, we believe that our people are our greatest asset.
                We foster a culture of continuous learning, collaboration, and
                innovation where every team member can thrive and make an impact.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value) => (
                  <motion.div
                    key={value.title}
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{value.title}</h4>
                      <p className="text-sm text-slate-600">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {benefits.slice(0, 6).map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mb-3">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{benefit.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-12 md:py-16 bg-slate-50" id="openings">
        <div className="container-custom">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Open Positions</h2>
            <p className="text-slate-600">Find your next opportunity from {filteredJobs.length} available positions</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-72 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 mb-4"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Panel */}
              <div className={`bg-white rounded-xl border border-slate-200 p-5 sticky top-24 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-slate-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Job title or keyword..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Department Filter */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Experience Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => {
                      setSelectedLevel(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Remote Only Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setRemoteOnly(!remoteOnly);
                      setCurrentPage(1);
                    }}
                    className={`w-10 h-6 rounded-full transition-colors relative ${remoteOnly ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${remoteOnly ? 'left-5' : 'left-1'}`}
                    />
                  </button>
                  <span className="text-sm text-slate-700">Remote only</span>
                </div>
              </div>
            </div>

            {/* Right Side - Job Listings */}
            <div className="flex-1">
              {/* Job Cards Grid */}
              {paginatedJobs.length > 0 ? (
                <>
                  <div className="grid gap-4">
                    {paginatedJobs.map((job) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        onClick={() => setSelectedJob(job)}
                        className={`bg-white rounded-xl border p-5 cursor-pointer transition-all ${
                          selectedJob?.id === job.id
                            ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                                {job.department}
                              </span>
                              {job.remote && (
                                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                  Remote Eligible
                                </span>
                              )}
                              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                {job.level}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end gap-2">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {job.posted}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedJob(job);
                                setShowApplyModal(true);
                              }}
                              className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-600">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} positions
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No positions found</h3>
                  <p className="text-slate-600 mb-4">Try adjusting your filters or search query</p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && !showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full md:max-w-3xl md:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-t-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-10">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to jobs</span>
                </button>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                    {selectedJob.department}
                  </span>
                  {selectedJob.remote && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      Remote Eligible
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                    {selectedJob.level}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{selectedJob.title}</h2>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-slate-600 mb-6 pb-6 border-b border-slate-200">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-slate-400" />
                    {selectedJob.type}
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-slate-400" />
                    {selectedJob.salary}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    Posted {selectedJob.posted}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">About this role</h3>
                    <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="flex-1 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  Apply for this position
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowApplyModal(false);
              setApplicationSubmitted(false);
              setResumeFile(null);
            }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full md:max-w-lg md:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-t-2xl"
            >
              {applicationSubmitted ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                  <p className="text-slate-600">
                    Thank you for applying. We&apos;ll review your application and get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-10">
                    <div>
                      <h3 className="font-semibold text-slate-900">Apply for position</h3>
                      <p className="text-sm text-slate-600">{selectedJob.title}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowApplyModal(false);
                        setResumeFile(null);
                      }}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleApply} className="flex-1 overflow-y-auto p-5 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Resume *</label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                          resumeFile ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {resumeFile ? (
                          <div className="flex items-center justify-center gap-3">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="text-left">
                              <p className="font-medium text-slate-900">{resumeFile.name}</p>
                              <p className="text-sm text-slate-600">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="p-1 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5 text-slate-600" />
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                            <p className="font-medium text-slate-700 mb-1">Click to upload or drag and drop</p>
                            <p className="text-sm text-slate-500">PDF, DOC, or DOCX (max. 5MB)</p>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  setResumeFile(e.target.files[0]);
                                }
                              }}
                              className="hidden"
                              required
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cover Letter</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us why you're interested in this role..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Application
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hiring Process */}
      <section className="py-12 md:py-16 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Hiring Process</h2>
            <p className="text-slate-400">
              Our hiring process is designed to be transparent, efficient, and
              respectful of your time.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Apply",
                description: "Submit your application online. We review every resume within 48 hours.",
              },
              {
                step: "02",
                title: "Screen",
                description: "Initial phone screen with our recruiting team to discuss your background.",
              },
              {
                step: "03",
                title: "Interview",
                description: "Technical and behavioral interviews with the hiring team.",
              },
              {
                step: "04",
                title: "Offer",
                description: "Receive a competitive offer and join the Ocean Blue family.",
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-white text-lg md:text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-sm md:text-base text-slate-400">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">Ready to Make an Impact?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6 md:mb-8">
              Join us in transforming how enterprises leverage technology. Your
              next career adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="#openings"
                className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2"
              >
                Browse All Positions
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/about"
                className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
