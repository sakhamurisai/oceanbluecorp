"use client";

import { useAuth, UserRole } from "@/lib/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
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
} from "lucide-react";

function DashboardContent() {
  const { user, signOut } = useAuth();

  // Mock data for demonstration
  const applications = [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "Ocean Blue Corporation",
      status: "reviewing",
      appliedDate: "2024-01-15",
    },
    {
      id: 2,
      position: "Full Stack Developer",
      company: "Ocean Blue Corporation",
      status: "interview",
      appliedDate: "2024-01-10",
    },
    {
      id: 3,
      position: "DevOps Engineer",
      company: "Ocean Blue Corporation",
      status: "pending",
      appliedDate: "2024-01-05",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "reviewing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3" />
            Under Review
          </span>
        );
      case "interview":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <CheckCircle className="w-3 h-3" />
            Interview Scheduled
          </span>
        );
      case "offered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            Offer Extended
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OB</span>
                </div>
                <span className="font-semibold text-gray-900">Ocean Blue</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="mt-1 text-gray-600">
            Track your job applications and manage your profile.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter((a) => a.status === "reviewing").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.filter((a) => a.status === "interview").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
            <Link
              href="/careers"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Browse Jobs
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {applications.map((application) => (
              <div
                key={application.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{application.position}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {application.company} &bull; Applied on{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(application.status)}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {applications.length === 0 && (
            <div className="px-6 py-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
              <p className="text-gray-500 mt-1">
                Start by browsing our open positions and applying to jobs.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
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
