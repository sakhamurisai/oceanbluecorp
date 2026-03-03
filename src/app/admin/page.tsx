"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  FileText,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  UserPlus,
  Loader2,
  MessageSquare,
  Mail,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  monthlyApplications?: { month: string; applications: number }[];
}

const statusConfig = {
  pending: { label: "Pending", variant: "outline" as const, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  reviewing: { label: "Reviewing", variant: "secondary" as const, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  interview: { label: "Interview", variant: "default" as const, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
  offered: { label: "Offered", variant: "default" as const, icon: Mail, color: "text-cyan-600", bg: "bg-cyan-50" },
  hired: { label: "Hired", variant: "default" as const, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
  active: { label: "Active", variant: "default" as const, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  paused: { label: "Paused", variant: "secondary" as const, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  draft: { label: "Draft", variant: "outline" as const, icon: FileText, color: "text-gray-600", bg: "bg-gray-50" },
  closed: { label: "Closed", variant: "destructive" as const, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
};

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
  hired: {
    label: "Hired",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"];

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Generate mock chart data based on stats
function generateChartData(totalApplications: number) {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      applications: Math.floor(Math.random() * (totalApplications / 10)) + 1,
      hired: Math.floor(Math.random() * 3),
    });
  }
  return data;
}

// Stat Card Component
function StatCard({
  title,
  value,
  description,
  trend,
  trendValue,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  value: number;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ElementType;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{title}</p>
              <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
            {trend === "up" ? (
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            ) : trend === "down" ? (
              <div className="flex items-center gap-1 text-rose-600">
                <TrendingDown className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <Activity className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{trendValue}</span>
              </div>
            )}
            <ArrowRight className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
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
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md border-rose-200 bg-rose-50">
          <CardHeader>
            <CardTitle className="text-rose-700 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Error Loading Dashboard
            </CardTitle>
            <CardDescription className="text-rose-600">{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
            >
              Retry
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!stats) return null;

  const chartData = generateChartData(stats.totalApplications);
  const conversionRate =
    stats.totalApplications > 0
      ? ((stats.hiredApplications / stats.totalApplications) * 100).toFixed(1)
      : "0";

  // Prepare pie chart data
  const pieData = Object.entries(stats.applicationsByStatus)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
    }));

  // Prepare department data for bar chart
  const departmentData = Object.entries(stats.jobsByDepartment || {})
    .slice(0, 5)
    .map(([dept, count]) => ({
      name: dept.length > 12 ? dept.slice(0, 12) + "..." : dept,
      jobs: count,
    }));

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      description: `${stats.pendingApplications} pending review`,
      trend: (stats.pendingApplications > 0 ? "up" : "neutral") as "up" | "down" | "neutral",
      trendValue: `${stats.pendingApplications} new`,
      icon: Users,
      href: "/admin/applications",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      description: `${stats.totalJobs} total positions`,
      trend: "up" as const,
      trendValue: `${stats.activeJobs} open`,
      icon: Briefcase,
      href: "/admin/jobs",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "In Pipeline",
      value: stats.reviewingApplications + stats.interviewApplications,
      description: `${stats.interviewApplications} in interviews`,
      trend: (stats.interviewApplications > 0 ? "up" : "neutral") as "up" | "down" | "neutral",
      trendValue: "Active candidates",
      icon: Target,
      href: "/admin/applications?status=reviewing",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Hired",
      value: stats.hiredApplications,
      description: `${conversionRate}% conversion rate`,
      trend: (stats.hiredApplications > 0 ? "up" : "neutral") as "up" | "down" | "neutral",
      trendValue: `${stats.offeredApplications} offers pending`,
      icon: UserPlus,
      href: "/admin/applications?status=hired",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here&apos;s an overview of your recruitment pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3 bg-white border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 font-medium">Live Data</span>
          </Badge>
          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Add New Job
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Chart and Pipeline Summary Row */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Applications Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Application Trends</CardTitle>
                <CardDescription>Applications received over the last 30 days</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-gray-500">Applications</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <ChartTooltip
                  cursor={{ stroke: "#3b82f6", strokeWidth: 1, strokeDasharray: "4" }}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="applications"
                  type="monotone"
                  fill="url(#fillApplications)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pipeline Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="w-5 h-5 text-gray-400" />
              Pipeline Summary
            </CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mini Pie Chart */}
            <div className="h-[160px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, "Applications"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>

            {/* Status List */}
            <div className="space-y-2.5">
              {Object.entries(stats.applicationsByStatus).map(([status, count], index) => {
                const config = statusConfig[status as keyof typeof statusConfig];
                const Icon = config?.icon || Clock;
                const percentage =
                  stats.totalApplications > 0
                    ? ((count / stats.totalApplications) * 100).toFixed(0)
                    : 0;
                return (
                  <div key={status} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <Icon className={`h-4 w-4 ${config?.color || "text-gray-500"}`} />
                      <span className="text-sm font-medium capitalize text-gray-700">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-medium bg-gray-50">
                        {percentage}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                      style={{ width: `${Math.min(parseFloat(conversionRate) * 5, 100)}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-emerald-600">{conversionRate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs by Department & Quick Stats */}
      {departmentData.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                Jobs by Department
              </CardTitle>
              <CardDescription>Distribution of open positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical" barCategoryGap={8}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="jobs" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Quick Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Draft Jobs</p>
                    <p className="text-xs text-gray-500">Awaiting publish</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">{stats.draftJobs}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Paused Jobs</p>
                    <p className="text-xs text-gray-500">Temporarily hidden</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-amber-600">{stats.pausedJobs}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-rose-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Closed Jobs</p>
                    <p className="text-xs text-gray-500">Positions filled</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-rose-600">{stats.closedJobs}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Offers Sent</p>
                    <p className="text-xs text-gray-500">Awaiting response</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-600">{stats.offeredApplications}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity Tables */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
              <CardDescription>Latest candidates in the pipeline</CardDescription>
            </div>
            <Link
              href="/admin/applications"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Candidate</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Position</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase text-right">Applied</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentApplications.map((app) => {
                    const config =
                      statusConfig[app.status as keyof typeof statusConfig] ||
                      statusConfig.pending;
                    return (
                      <TableRow key={app.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                              {(app.name || "NA")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{app.name || "Unknown"}</div>
                              <div className="text-xs text-gray-500">{app.email || "No email"}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 font-medium">{app.position}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${config.bg} ${config.color} border-0 font-medium capitalize`}
                          >
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm text-gray-500 flex items-center justify-end gap-1">
                            <Calendar className="w-3 h-3" />
                            {getTimeAgo(app.appliedAt)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600">No applications yet</p>
                <p className="text-xs text-gray-400 mt-1">Applications will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Jobs */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Active Job Postings</CardTitle>
              <CardDescription>Current open positions</CardDescription>
            </div>
            <Link
              href="/admin/jobs"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentJobs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Position</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Department</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase">Applicants</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.recentJobs.map((job) => {
                    const config =
                      statusConfig[job.status as keyof typeof statusConfig] ||
                      statusConfig.active;
                    return (
                      <TableRow key={job.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{job.title}</div>
                            <div className="text-xs text-gray-500">{job.location}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 font-medium">{job.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              {[...Array(Math.min(3, job.applicants))].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white"
                                />
                              ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {job.applicants}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={`${config.bg} ${config.color} border-0 font-medium capitalize`}
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600">No jobs posted yet</p>
                <p className="text-xs text-gray-400 mt-1">Create your first job posting</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/jobs/new"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Add New Job</div>
                <div className="text-xs text-gray-500">Create posting</div>
              </div>
            </Link>
            <Link
              href="/admin/applications"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Applications</div>
                <div className="text-xs text-gray-500">
                  {stats.pendingApplications} pending
                </div>
              </div>
            </Link>
            <Link
              href="/admin/candidates"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all group"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Candidates</div>
                <div className="text-xs text-gray-500">Talent database</div>
              </div>
            </Link>
            <Link
              href="/careers"
              target="_blank"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all group"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">View Careers</div>
                <div className="text-xs text-gray-500">Preview site</div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
