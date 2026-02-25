"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Users,
  MapPin,
  Briefcase,
  CheckCircle2,
  Copy,
  Loader2,
  DollarSign,
  X,
  Download,
  Calendar,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Job } from "@/lib/aws/dynamodb";
import { useAuth } from "@/lib/auth/AuthContext";

// shadcn/ui components
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10",
  },
  paused: {
    label: "Paused",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10",
  },
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  closed: {
    label: "Closed",
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/10",
  },
};

const departments = [
  "ERP Solutions",
  "Cloud Services",
  "Data & AI",
  "Salesforce",
  "IT Staffing",
  "Training",
  "PMO",
  "Operations",
];

export default function JobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "ERP Solutions",
    location: "",
    type: "full-time" as Job["type"],
    description: "",
    requirements: "",
    responsibilities: "",
    salaryMin: "",
    salaryMax: "",
    status: "draft" as Job["status"],
    submissionDueDate: "",
    notifyHROnApplication: false,
    notifyAdminOnApplication: false,
  });

  const exportJobsToExcel = () => {
    const headers = ["Title", "Department", "Location", "Type", "Status", "Due Date", "Applicants", "Salary Range", "Created At"];
    const rows = filteredJobs.map(job => [
      job.title,
      job.department,
      job.location,
      job.type,
      job.status,
      job.submissionDueDate ? new Date(job.submissionDueDate).toLocaleDateString() : "N/A",
      job.applicationsCount || 0,
      job.salary ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}` : "N/A",
      new Date(job.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `jobs_export_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch jobs");
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (jobId: string, newStatus: Job["status"]) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job)));
    } catch (err) {
      alert("Failed to update job status");
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setShowDeleteConfirm(null);
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        type: formData.type,
        description: formData.description,
        requirements: formData.requirements.split("\n").filter(Boolean),
        responsibilities: formData.responsibilities.split("\n").filter(Boolean),
        salary: formData.salaryMin && formData.salaryMax ? {
          min: parseInt(formData.salaryMin),
          max: parseInt(formData.salaryMax),
          currency: "$",
        } : undefined,
        status: formData.status,
        submissionDueDate: formData.submissionDueDate || undefined,
        notifyHROnApplication: formData.notifyHROnApplication,
        notifyAdminOnApplication: formData.notifyAdminOnApplication,
        ...(!editingJob && {
          postedByName: user?.name || user?.email?.split("@")[0] || "Admin",
          postedByEmail: user?.email || "",
          postedByRole: user?.role || "admin",
        }),
      };

      const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save job");
      }

      await fetchJobs();
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save job");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "ERP Solutions",
      location: "",
      type: "full-time",
      description: "",
      requirements: "",
      responsibilities: "",
      salaryMin: "",
      salaryMax: "",
      status: "draft",
      submissionDueDate: "",
      notifyHROnApplication: false,
      notifyAdminOnApplication: false,
    });
    setShowCreateModal(false);
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements?.join("\n") || "",
      responsibilities: job.responsibilities?.join("\n") || "",
      salaryMin: job.salary?.min?.toString() || "",
      salaryMax: job.salary?.max?.toString() || "",
      status: job.status,
      submissionDueDate: job.submissionDueDate?.split("T")[0] || "",
      notifyHROnApplication: job.notifyHROnApplication || false,
      notifyAdminOnApplication: job.notifyAdminOnApplication || false,
    });
    setShowCreateModal(true);
  };

  const handleDuplicate = (job: Job) => {
    setEditingJob(null);
    setFormData({
      title: `${job.title} (Copy)`,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements?.join("\n") || "",
      responsibilities: job.responsibilities?.join("\n") || "",
      salaryMin: job.salary?.min?.toString() || "",
      salaryMax: job.salary?.max?.toString() || "",
      status: "draft",
      submissionDueDate: "",
      notifyHROnApplication: job.notifyHROnApplication || false,
      notifyAdminOnApplication: job.notifyAdminOnApplication || false,
    });
    setShowCreateModal(true);
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    totalApplicants: jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
          <p className="text-muted-foreground text-sm">Loading jobs...</p>
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
          <h1 className="text-2xl font-semibold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground text-sm">Manage job listings and track applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportJobsToExcel}>
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button size="sm" onClick={() => { resetForm(); setShowCreateModal(true); }}>
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Job</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 py-0">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalApplicants}</p>
                <p className="text-xs text-muted-foreground">Applicants</p>
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
                placeholder="Search jobs..."
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
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="grid gap-3 lg:hidden">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const status = statusConfig[job.status as keyof typeof statusConfig];
            return (
              <Card key={job.id} className="py-4">
                <CardContent className="px-4 py-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <button
                        onClick={() => router.push(`/admin/jobs/${job.id}`)}
                        className="font-medium text-foreground hover:text-primary transition-colors text-left truncate block"
                      >
                        {job.title}
                      </button>
                      <p className="text-xs text-muted-foreground capitalize">{job.type}</p>
                    </div>
                    <Badge variant="outline" className={status.className}>{status.label}</Badge>
                  </div>

                  <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5" />
                      <span>{job.applicationsCount || 0} applicants</span>
                    </div>
                  </div>

                  <Separator className="mb-3" />

                  <div className="flex items-center justify-between">
                    {job.postedByName ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {job.postedByName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{job.postedByName}</span>
                      </div>
                    ) : <div />}
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => router.push(`/admin/jobs/${job.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => handleEdit(job)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setShowDeleteConfirm(job.id)}>
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
              <Briefcase className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No jobs found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop Table */}
      <Card className="hidden lg:block py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Posted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => {
              const status = statusConfig[job.status as keyof typeof statusConfig];
              return (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <button
                        onClick={() => router.push(`/admin/jobs/${job.id}`)}
                        className="font-medium text-foreground hover:text-primary transition-colors text-left"
                      >
                        {job.title}
                      </button>
                      <p className="text-xs text-muted-foreground capitalize">{job.type}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => router.push(`/admin/jobs/${job.id}`)}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Users className="h-3.5 w-3.5" />
                      {job.applicationsCount || 0}
                    </button>
                  </TableCell>
                  <TableCell>
                    {job.postedByName ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {job.postedByName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-medium">{job.postedByName}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{job.postedByRole || "HR"}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select value={job.status} onValueChange={(value) => handleStatusChange(job.id, value as Job["status"])}>
                      <SelectTrigger className="h-7 w-[100px] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${job.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(job)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(job)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setShowDeleteConfirm(job.id)} variant="destructive">
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

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-4">No jobs found</p>
            <Button onClick={() => { resetForm(); setShowCreateModal(true); }}>
              Create your first job
            </Button>
          </div>
        )}
      </Card>

      {/* Create/Edit Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto py-0">
            <div className="sticky top-0 bg-card z-10 px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingJob ? "Edit Job" : "New Job Posting"}</h2>
              <Button variant="ghost" size="icon-sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Department *</Label>
                    <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Job Type *</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v as Job["type"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="contract-to-hire">Contract-to-Hire</SelectItem>
                        <SelectItem value="direct-hire">Direct Hire</SelectItem>
                        <SelectItem value="managed-teams">Managed Teams</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Remote, New York, NY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Job["status"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.submissionDueDate}
                      onChange={(e) => setFormData({ ...formData, submissionDueDate: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Min Salary</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                        placeholder="80000"
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Max Salary</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                        placeholder="120000"
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
                    placeholder="Describe the role..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
                    placeholder="5+ years experience&#10;Bachelor's degree..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                  <textarea
                    id="responsibilities"
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
                    placeholder="Lead technical projects&#10;Mentor junior developers..."
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Email Notifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="notifyHR"
                        checked={formData.notifyHROnApplication}
                        onCheckedChange={(checked) => setFormData({ ...formData, notifyHROnApplication: checked as boolean })}
                      />
                      <Label htmlFor="notifyHR" className="text-sm font-normal cursor-pointer">
                        Notify HR team on new applications
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="notifyAdmin"
                        checked={formData.notifyAdminOnApplication}
                        onCheckedChange={(checked) => setFormData({ ...formData, notifyAdminOnApplication: checked as boolean })}
                      />
                      <Label htmlFor="notifyAdmin" className="text-sm font-normal cursor-pointer">
                        Notify Administrators on new applications
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingJob ? "Save Changes" : "Create Job"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm py-6">
            <CardContent className="text-center px-6 py-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delete Job?</h3>
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
