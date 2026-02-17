"use client";

import { useAuth, UserRole } from "@/lib/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  Bell,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  MapPin,
  Calendar,
  Building2,
  Star,
  Eye,
  Sparkles,
} from "lucide-react";

interface Application {
  id: string;
  userId: string;
  jobId: string;
  resumeId: string;
  status: "pending" | "reviewing" | "interview" | "offered" | "hired" | "rejected";
  appliedAt: string;
  updatedAt?: string;
  notes?: string;
  rating?: number;
  name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  coverLetter?: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  description: string;
  status: "active" | "paused" | "closed" | "draft";
}

interface ApplicationWithJob extends Application {
  job?: Job;
}

function DashboardContent() {
  const { user, signOut } = useAuth();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchApplications = useCallback(async () => {
    if (!user?.id) return;

    try {
      setError(null);

      // Fetch applications for the current user
      const response = await fetch(`/api/applications?userId=${user.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      const userApplications: Application[] = data.applications || [];

      // Fetch job details for each application
      const applicationsWithJobs: ApplicationWithJob[] = await Promise.all(
        userApplications.map(async (app) => {
          try {
            const jobResponse = await fetch(`/api/jobs/${app.jobId}`);
            if (jobResponse.ok) {
              const jobData = await jobResponse.json();
              return { ...app, job: jobData.job };
            }
          } catch {
            // If job fetch fails, continue without job data
          }
          return app;
        })
      );

      setApplications(applicationsWithJobs);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err instanceof Error ? err.message : "Failed to load applications");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchApplications();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case "reviewing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Eye className="w-3 h-3" />
            Under Review
          </span>
        );
      case "interview":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <Calendar className="w-3 h-3" />
            Interview Scheduled
          </span>
        );
      case "offered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Star className="w-3 h-3" />
            Offer Extended
          </span>
        );
      case "hired":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-3 h-3" />
            Hired
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Not Selected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getJobTypeBadge = (type: string) => {
    const typeLabels: Record<string, string> = {
      "full-time": "Full-time",
      "part-time": "Part-time",
      "contract": "Contract",
      "remote": "Remote",
    };
    return typeLabels[type] || type;
  };

  // Calculate stats
  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offered: applications.filter((a) => a.status === "offered" || a.status === "hired").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://oceanbluecorp.com/images/logo.png"
                  alt="Ocean Blue Corporation"
                  width={140}
                  height={40}
                  className="h-7 md:h-8 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {stats.interview > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-medium">
                {user?.name?.split(" ")[0] || "User"}
              </span>
            </h1>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-gray-500">
            Track your job applications and stay updated on your career opportunities.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-light text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-light text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Review</p>
                <p className="text-2xl font-light text-gray-900">{stats.reviewing}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Interviews</p>
                <p className="text-2xl font-light text-gray-900">{stats.interview}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
            <Link
              href="/careers"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              Browse Jobs
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="px-6 py-16 text-center">
              <Loader2 className="w-10 h-10 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500">Loading your applications...</p>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="px-6 py-12 text-center">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load applications</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Applications */}
          {!isLoading && !error && (
            <AnimatePresence>
              {applications.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {applications.map((application, index) => (
                    <motion.div
                      key={application.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                {application.job?.title || "Position"}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3.5 h-3.5" />
                                  {application.job?.department || "Department"}
                                </span>
                                {application.job?.location && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3.5 h-3.5" />
                                      {application.job.location}
                                    </span>
                                  </>
                                )}
                                {application.job?.type && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-blue-600 font-medium">
                                      {getJobTypeBadge(application.job.type)}
                                    </span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Applied {new Date(application.appliedAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                                {application.updatedAt && application.updatedAt !== application.appliedAt && (
                                  <span>
                                    {" "}• Updated {new Date(application.updatedAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          {getStatusBadge(application.status)}
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Start exploring career opportunities and submit your first application today.
                  </p>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Browse Open Positions
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Quick Tips */}
        {!isLoading && !error && applications.length > 0 && stats.interview > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  You have {stats.interview} interview{stats.interview > 1 ? "s" : ""} scheduled!
                </h3>
                <p className="text-sm text-gray-600">
                  Prepare for your upcoming interviews by reviewing the job descriptions and practicing common questions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.HR, UserRole.USER]}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
