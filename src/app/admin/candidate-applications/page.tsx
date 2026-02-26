"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Copy,
  Loader2,
  Download,
  Eye,
  MoreHorizontal,
  Star,
  Phone,
  Mail,
  Briefcase,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import { CandidateApplication, Job } from "@/lib/aws/dynamodb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground",
  },
  hired: {
    label: "Hired",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/10",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/10",
  },
};

export default function CandidateApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [duplicating, setDuplicating] = useState<string | null>(null);

  const exportApplicationsToExcel = () => {
    const headers = ["App ID", "Name", "Phone", "Email", "Job ID", "Job Title", "Status", "Rating", "Created Date"];
    const rows = filteredApplications.map(app => [
      app.applicationId || "",
      `${app.firstName} ${app.lastName}`,
      app.phone,
      app.email,
      app.jobId || "",
      app.jobTitle || "",
      app.status,
      app.rating?.toString() || "",
      new Date(app.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `candidate_applications_export_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsResponse, jobsResponse] = await Promise.all([
        fetch("/api/candidate-applications"),
        fetch("/api/jobs"),
      ]);
      const appsData = await appsResponse.json();
      const jobsData = await jobsResponse.json();

      if (!appsResponse.ok) throw new Error(appsData.error || "Failed to fetch applications");

      setApplications(appsData.applications || []);
      setJobs(jobsData.jobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (appId: string, newStatus: CandidateApplication["status"]) => {
    try {
      const response = await fetch(`/api/candidate-applications/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app)));
    } catch (err) {
      alert("Failed to update application status");
    }
  };

  const handleDelete = async (appId: string) => {
    try {
      const response = await fetch(`/api/candidate-applications/${appId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete application");
      setApplications((prev) => prev.filter((app) => app.id !== appId));
      setShowDeleteConfirm(null);
    } catch (err) {
      alert("Failed to delete application");
    }
  };

  const handleDuplicate = async (app: CandidateApplication) => {
    setDuplicating(app.id);
    try {
      const response = await fetch(`/api/candidate-applications/${app.id}/duplicate`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to duplicate application");
      }

      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to duplicate application");
    } finally {
      setDuplicating(null);
    }
  };

  const handleRatingChange = async (appId: string, rating: number) => {
    try {
      const response = await fetch(`/api/candidate-applications/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) throw new Error("Failed to update rating");
      setApplications((prev) => prev.map((app) => (app.id === appId ? { ...app, rating } : app)));
    } catch (err) {
      alert("Failed to update rating");
    }
  };

  const stats = {
    total: applications.length,
    active: applications.filter((a) => a.status === "active").length,
    hired: applications.filter((a) => a.status === "hired").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
          <p className="text-muted-foreground text-sm">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-destructive text-sm">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Candidate Applications</h1>
          <p className="text-muted-foreground text-sm">Manage candidate applications and track recruitment pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportApplicationsToExcel}>
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" onClick={() => router.push("/admin/candidate-applications/new")}>
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Create New Application</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <UserCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.hired}</p>
                <p className="text-xs text-muted-foreground">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                <UserX className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="py-4">
        <CardContent className="px-4 py-0">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="grid gap-3 lg:hidden">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => {
            const status = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.active;
            return (
              <Card key={app.id} className="py-4">
                <CardContent className="px-4 py-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-primary">{app.applicationId}</span>
                      <button
                        onClick={() => router.push(`/admin/candidate-applications/${app.id}`)}
                        className="font-medium text-foreground hover:text-primary transition-colors text-left truncate block"
                      >
                        {app.firstName} {app.lastName}
                      </button>
                      <p className="text-xs text-muted-foreground">{app.jobTitle || "No job assigned"}</p>
                    </div>
                    <Badge variant="outline" className={status.className}>{status.label}</Badge>
                  </div>

                  <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate">{app.email}</span>
                    </div>
                  </div>

                  <Separator className="mb-3" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(app.id, star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              star <= (app.rating || 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => router.push(`/admin/candidate-applications/${app.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => router.push(`/admin/candidate-applications/${app.id}/edit`)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDuplicate(app)}
                        disabled={duplicating === app.id}
                      >
                        {duplicating === app.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setShowDeleteConfirm(app.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="py-8">
            <CardContent className="text-center">
              <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No applications found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop Table */}
      <Card className="hidden lg:block py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Job ID</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => {
              const status = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.active;
              const job = jobs.find(j => j.id === app.jobId);
              return (
                <TableRow key={app.id}>
                  <TableCell>
                    <span className="font-mono text-sm text-primary font-medium">
                      {app.applicationId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => router.push(`/admin/candidate-applications/${app.id}`)}
                      className="font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {app.firstName} {app.lastName}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span className="text-sm">{app.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="text-sm truncate max-w-[180px]">{app.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {job?.postingId || app.jobId || "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{app.jobTitle || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <Select value={app.status} onValueChange={(value) => handleStatusChange(app.id, value as CandidateApplication["status"])}>
                      <SelectTrigger className="h-7 w-[100px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(app.id, star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-3.5 h-3.5 transition-colors ${
                              star <= (app.rating || 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => router.push(`/admin/candidate-applications/${app.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/candidate-applications/${app.id}/edit`)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(app)} disabled={duplicating === app.id}>
                          {duplicating === app.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setShowDeleteConfirm(app.id)} variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-4">No applications found</p>
            <Button onClick={() => router.push("/admin/candidate-applications/new")}>
              Create your first application
            </Button>
          </div>
        )}
      </Card>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm py-6">
            <CardContent className="text-center px-6 py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delete Application?</h3>
              <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleDelete(showDeleteConfirm)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
