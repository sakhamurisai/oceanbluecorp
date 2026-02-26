"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Edit3,
  Trash2,
  Copy,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Star,
  Calendar,
  User,
  FileCheck,
  Building2,
  Shield,
  Hash,
  StickyNote,
  UserCog,
} from "lucide-react";
import { CandidateApplication, Job } from "@/lib/aws/dynamodb";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground",
  },
  hired: {
    label: "Hired",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
};

export default function CandidateApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [application, setApplication] = useState<CandidateApplication | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [duplicating, setDuplicating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/candidate-applications/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch application");
      }

      setApplication(data.application);

      // Fetch job if jobId exists
      if (data.application.jobId) {
        const jobResponse = await fetch(`/api/jobs/${data.application.jobId}`);
        if (jobResponse.ok) {
          const jobData = await jobResponse.json();
          setJob(jobData.job);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/candidate-applications/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete application");
      router.push("/admin/candidate-applications");
    } catch (err) {
      alert("Failed to delete application");
    }
  };

  const handleDuplicate = async () => {
    setDuplicating(true);
    try {
      const response = await fetch(`/api/candidate-applications/${id}/duplicate`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to duplicate application");
      }

      const data = await response.json();
      router.push(`/admin/candidate-applications/${data.application.id}/edit`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to duplicate application");
    } finally {
      setDuplicating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
          <p className="text-muted-foreground text-sm">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-destructive text-sm">{error || "Application not found"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const status = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm text-primary font-medium">{application.applicationId}</span>
              <Badge variant="outline" className={status.className}>{status.label}</Badge>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {application.firstName} {application.lastName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            disabled={duplicating}
          >
            {duplicating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/candidate-applications/${id}/edit`)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">First Name</p>
                <p className="font-medium">{application.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Name</p>
                <p className="font-medium">{application.lastName}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href={`tel:${application.phone}`} className="font-medium hover:text-primary">
                  {application.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a href={`mailto:${application.email}`} className="font-medium hover:text-primary break-all">
                  {application.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="font-medium">{application.address || "-"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">City</p>
                <p className="font-medium">{application.city || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">State</p>
                <p className="font-medium">{application.state || "-"}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ZIP Code</p>
              <p className="font-medium">{application.zipCode || "-"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Application ID</p>
              <p className="font-mono font-medium text-primary">{application.applicationId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Source</p>
              <p className="font-medium">{application.source}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge variant="outline" className={status.className}>{status.label}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Job ID</p>
              <p className="font-mono font-medium">{job?.postingId || application.jobId || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Job Title</p>
              <p className="font-medium">{application.jobTitle || "-"}</p>
            </div>
            {job && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{job.location}{job.state ? `, ${job.state}` : ""}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium">{job.clientName || "-"}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Work Authorization & Ownership */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Authorization & Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Work Authorization</p>
              <p className="font-medium">{application.workAuthorization}</p>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <UserCog className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Ownership (Assigned To)</p>
                <p className="font-medium">{application.ownershipName || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating & Talent Bench
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Rating</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= (application.rating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {application.rating || 0}/5
                </span>
              </div>
            </div>
            <Separator />
            {application.addToTalentBench && (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <FileCheck className="h-4 w-4" />
                <span>Added to Talent Bench</span>
              </div>
            )}
            {!application.addToTalentBench && (
              <div className="text-sm text-muted-foreground">
                Not added to Talent Bench
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <StickyNote className="h-4 w-4" />
            Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {application.notes ? (
            <p className="whitespace-pre-wrap text-sm">{application.notes}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No notes added</p>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Created By</p>
              <p className="font-medium">{application.createdByName || "System"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Created On</p>
              <p className="font-medium">
                {new Date(application.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {application.updatedAt && (
              <div>
                <p className="text-xs text-muted-foreground">Last Modified</p>
                <p className="font-medium">
                  {new Date(application.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
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
              <p className="text-sm text-muted-foreground mb-6">
                This will permanently delete the application for {application.firstName} {application.lastName}.
                This action cannot be undone.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
