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
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-primary">{application.applicationId}</span>
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href={`tel:${application.phone}`} className="font-medium hover:text-primary">
                  {application.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href={`mailto:${application.email}`} className="font-medium hover:text-primary">
                  {application.email}
                </a>
              </div>
            </div>
            {(application.address || application.city || application.state) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {application.address && <span>{application.address}<br /></span>}
                    {[application.city, application.state, application.zipCode].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Source</p>
                <p className="font-medium">{application.source}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Work Authorization</p>
                <p className="font-medium">{application.workAuthorization}</p>
              </div>
            </div>
            {application.jobId && (
              <>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Applied For</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{application.jobTitle || "Unknown Position"}</p>
                      {job && (
                        <p className="text-xs text-muted-foreground">
                          {job.postingId} - {job.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {application.ownershipName && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{application.ownershipName}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${
                    star <= (application.rating || 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-medium">
                {application.rating || 0}/5
              </span>
            </div>
            {application.addToTalentBench && (
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                <FileCheck className="h-4 w-4" />
                <span>Added to Talent Bench</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created By</p>
                <p className="font-medium">{application.createdByName || "System"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created On</p>
                <p className="font-medium">
                  {new Date(application.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            {application.updatedAt && (
              <div>
                <p className="text-sm text-muted-foreground">Last Modified</p>
                <p className="font-medium">
                  {new Date(application.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      {application.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{application.notes}</p>
          </CardContent>
        </Card>
      )}

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
