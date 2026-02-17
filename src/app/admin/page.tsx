"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  FileText,
  Eye,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Activity,
  UserPlus,
  Loader2,
  MessageSquare,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  pausedJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
  pendingApplications: number;
  reviewingApplications: number;
  interviewApplications: number;
  offeredApplications: number;
  hiredApplications: number;
  rejectedApplications: number;
  recentApplications: {
    id: string;
    name: string;
    email: string;
    position: string;
    status: string;
    appliedAt: string;
  }[];
  recentJobs: {
    id: string;
    title: string;
    department: string;
    location: string;
    applicants: number;
    status: string;
  }[];
  applicationsByStatus: Record<string, number>;
  jobsByDepartment: Record<string, number>;
}

const statusStyles = {
  pending: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  reviewing: { bg: "bg-blue-100", text: "text-blue-700", icon: Eye },
  interview: { bg: "bg-purple-100", text: "text-purple-700", icon: MessageSquare },
  offered: { bg: "bg-cyan-100", text: "text-cyan-700", icon: Mail },
  hired: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
  rejected: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  active: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
  paused: { bg: "bg-slate-100", text: "text-slate-600", icon: Clock },
  draft: { bg: "bg-gray-100", text: "text-gray-600", icon: FileText },
  closed: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/stats");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch stats");
        }

        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-cyan-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      name: "Total Applications",
      value: stats.totalApplications.toString(),
      change: `${stats.pendingApplications} pending`,
      changeType: "info",
      icon: Users,
      href: "/admin/applications",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Active Jobs",
      value: stats.activeJobs.toString(),
      change: `${stats.totalJobs} total`,
      changeType: "info",
      icon: Briefcase,
      href: "/admin/jobs",
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "In Review",
      value: (stats.reviewingApplications + stats.interviewApplications).toString(),
      change: `${stats.interviewApplications} interviews`,
      changeType: "info",
      icon: Eye,
      href: "/admin/applications?status=reviewing",
      color: "from-violet-500 to-purple-600",
    },
    {
      name: "Hired",
      value: stats.hiredApplications.toString(),
      change: `${stats.offeredApplications} offers pending`,
      changeType: "increase",
      icon: UserPlus,
      href: "/admin/applications?status=hired",
      color: "from-amber-500 to-orange-600",
    },
  ];

  // Calculate conversion rate
  const conversionRate = stats.totalApplications > 0
    ? ((stats.hiredApplications / stats.totalApplications) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>Live Data</span>
          </div>
          <Link
            href="/admin/jobs/new"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25"
          >
            Add New Job
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === "increase" ? "text-emerald-600" : "text-slate-500"
                }`}>
                  {stat.changeType === "increase" && <ArrowUpRight className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 mt-1">{stat.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Activity Chart & Quick Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications by Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-900">Applications by Status</h2>
              <p className="text-sm text-slate-500">Current pipeline breakdown</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stats.applicationsByStatus).map(([status, count]) => {
              const style = statusStyles[status as keyof typeof statusStyles];
              const StatusIcon = style?.icon || Clock;
              return (
                <div key={status} className={`p-4 rounded-xl ${style?.bg || "bg-gray-100"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className={`w-4 h-4 ${style?.text || "text-gray-600"}`} />
                    <span className={`text-sm font-medium capitalize ${style?.text || "text-gray-600"}`}>
                      {status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold">Quick Stats</h2>
              <p className="text-sm text-slate-400">Overview</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Conversion Rate</span>
                <span className="text-sm font-semibold text-emerald-400">
                  {stats.hiredApplications > 0 ? "Active" : "N/A"}
                </span>
              </div>
              <p className="text-2xl font-bold">{conversionRate}%</p>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                  style={{ width: `${Math.min(parseFloat(conversionRate), 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Total Jobs</span>
                <span className="text-sm font-semibold text-cyan-400">{stats.activeJobs} active</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Pending Review</span>
                <span className="text-sm font-semibold text-amber-400">needs attention</span>
              </div>
              <p className="text-2xl font-bold">{stats.pendingApplications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Recent Applications</h2>
              <p className="text-sm text-slate-500">Latest candidates</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentApplications.length > 0 ? (
              stats.recentApplications.map((app) => {
                const status = statusStyles[app.status as keyof typeof statusStyles] || statusStyles.pending;
                const StatusIcon = status.icon;
                return (
                  <div
                    key={app.id}
                    className="px-6 py-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                          {app.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{app.name}</p>
                          <p className="text-sm text-slate-500">{app.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${status.bg} ${status.text}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {app.status}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:block">
                          {getTimeAgo(app.appliedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-slate-500">
                No applications yet
              </div>
            )}
          </div>
        </div>

        {/* Active Job Postings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Active Job Postings</h2>
              <p className="text-sm text-slate-500">Current openings</p>
            </div>
            <Link
              href="/admin/jobs"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentJobs.length > 0 ? (
              stats.recentJobs.map((job) => {
                const status = statusStyles[job.status as keyof typeof statusStyles] || statusStyles.active;
                return (
                  <div
                    key={job.id}
                    className="px-6 py-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{job.title}</p>
                        <p className="text-sm text-slate-500">
                          {job.department} &bull; {job.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-semibold text-slate-900">{job.applicants}</p>
                          <p className="text-xs text-slate-500">applicants</p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${status.bg} ${status.text}`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-slate-500">
                No jobs posted yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="font-medium text-slate-900 block">Add New Job</span>
              <span className="text-xs text-slate-500">Create posting</span>
            </div>
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-300 transition-colors">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="font-medium text-slate-900 block">Applications</span>
              <span className="text-xs text-slate-500">{stats.pendingApplications} pending</span>
            </div>
          </Link>
          <Link
            href="/admin/jobs"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center group-hover:from-violet-200 group-hover:to-violet-300 transition-colors">
              <Users className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <span className="font-medium text-slate-900 block">Manage Jobs</span>
              <span className="text-xs text-slate-500">{stats.totalJobs} jobs</span>
            </div>
          </Link>
          <Link
            href="/careers"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:from-amber-200 group-hover:to-amber-300 transition-colors">
              <Eye className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="font-medium text-slate-900 block">View Careers</span>
              <span className="text-xs text-slate-500">Preview site</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
