"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Star,
  FileText,
} from "lucide-react";
import { Job, CandidateApplication } from "@/lib/aws/dynamodb";
import { useAuth } from "@/lib/auth/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const HR_USERS = [
  { id: "hr-1", name: "John Smith" },
  { id: "hr-2", name: "Sarah Johnson" },
  { id: "hr-3", name: "Mike Chen" },
  { id: "hr-4", name: "Lisa Wong" },
];

interface CognitoUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
}

export default function EditCandidateApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hrUsers, setHrUsers] = useState<CognitoUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    applicationId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    source: "" as CandidateApplication["source"] | "",
    status: "active" as CandidateApplication["status"],
    jobId: "",
    jobTitle: "",
    ownership: "",
    ownershipName: "",
    workAuthorization: "" as CandidateApplication["workAuthorization"] | "",
    rating: 0,
    notes: "",
    addToTalentBench: false,
    createdAt: "",
    createdByName: "",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appResponse, jobsResponse, usersResponse] = await Promise.all([
        fetch(`/api/candidate-applications/${id}`),
        fetch("/api/jobs"),
        fetch("/api/users"),
      ]);

      const appData = await appResponse.json();
      const jobsData = await jobsResponse.json();
      const usersData = await usersResponse.json();

      if (!appResponse.ok) {
        throw new Error(appData.error || "Failed to fetch application");
      }

      const app = appData.application;
      setFormData({
        applicationId: app.applicationId || "",
        firstName: app.firstName || "",
        lastName: app.lastName || "",
        phone: app.phone || "",
        email: app.email || "",
        address: app.address || "",
        city: app.city || "",
        state: app.state || "",
        zipCode: app.zipCode || "",
        source: app.source || "",
        status: app.status || "active",
        jobId: app.jobId || "",
        jobTitle: app.jobTitle || "",
        ownership: app.ownership || "",
        ownershipName: app.ownershipName || "",
        workAuthorization: app.workAuthorization || "",
        rating: app.rating || 0,
        notes: app.notes || "",
        addToTalentBench: app.addToTalentBench || false,
        createdAt: app.createdAt || "",
        createdByName: app.createdByName || "",
      });

      setJobs(jobsData.jobs || []);

      if (usersResponse.ok) {
        const users = usersData.users || [];
        setHrUsers(users.filter((u: CognitoUser) => u.role === "hr" || u.role === "admin"));
      } else {
        setHrUsers(HR_USERS.map(u => ({ ...u, email: "", role: "hr", status: "active" })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
        throw new Error("Please fill in all required fields");
      }
      if (!formData.source) {
        throw new Error("Please select a source");
      }
      if (!formData.workAuthorization) {
        throw new Error("Please select work authorization");
      }

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        zipCode: formData.zipCode || undefined,
        source: formData.source,
        status: formData.status,
        jobId: formData.jobId || undefined,
        jobTitle: formData.jobTitle || undefined,
        ownership: formData.ownership || undefined,
        ownershipName: formData.ownershipName || undefined,
        workAuthorization: formData.workAuthorization,
        rating: formData.rating || undefined,
        notes: formData.notes || undefined,
        addToTalentBench: formData.addToTalentBench,
      };

      const response = await fetch(`/api/candidate-applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update application");
      }

      router.push("/admin/candidate-applications");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleJobSelect = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    setFormData({
      ...formData,
      jobId: jobId,
      jobTitle: job?.title || "",
    });
  };

  const handleOwnershipSelect = (userId: string) => {
    const selectedUser = hrUsers.find((u) => u.id === userId);
    setFormData({
      ...formData,
      ownership: userId,
      ownershipName: selectedUser?.name || selectedUser?.email || "",
    });
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <p className="text-destructive text-sm">{error}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit Application</h1>
          <p className="text-muted-foreground text-sm">
            {formData.applicationId} - {formData.firstName} {formData.lastName}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Application Info */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-muted-foreground">Application ID</p>
                  <p className="font-mono font-medium">{formData.applicationId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created By</p>
                  <p className="font-medium">{formData.createdByName || "System"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created On</p>
                  <p className="font-medium">
                    {formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{formData.status}</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.doe@example.com"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select value={formData.state} onValueChange={(v) => setFormData({ ...formData, state: v })}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="10001"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Application Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source *</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(v) => setFormData({ ...formData, source: v as CandidateApplication["source"] })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Indeed">Indeed</SelectItem>
                      <SelectItem value="Company Website">Company Website</SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Agency">Agency</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as CandidateApplication["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job ID</Label>
                  <Select value={formData.jobId} onValueChange={handleJobSelect}>
                    <SelectTrigger><SelectValue placeholder="Select a job" /></SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.postingId ? `${job.postingId} - ` : ""}{job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    disabled
                    placeholder="Auto-populated from Job ID"
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ownership (HR Assignment)</Label>
                  <Select value={formData.ownership} onValueChange={handleOwnershipSelect}>
                    <SelectTrigger><SelectValue placeholder="Assign to HR user" /></SelectTrigger>
                    <SelectContent>
                      {hrUsers.length > 0 ? (
                        hrUsers.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name || u.email}
                          </SelectItem>
                        ))
                      ) : (
                        HR_USERS.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Work Authorization *</Label>
                  <Select
                    value={formData.workAuthorization}
                    onValueChange={(v) => setFormData({ ...formData, workAuthorization: v as CandidateApplication["workAuthorization"] })}
                  >
                    <SelectTrigger><SelectValue placeholder="Select authorization" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US Citizen">US Citizen</SelectItem>
                      <SelectItem value="Green Card">Green Card</SelectItem>
                      <SelectItem value="H1-B">H1-B</SelectItem>
                      <SelectItem value="OPT/CPT">OPT/CPT</SelectItem>
                      <SelectItem value="TN Visa">TN Visa</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Rating & Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Rating & Notes
              </h3>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || formData.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: 0 })}
                      className="ml-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
                  placeholder="Add any additional comments about this candidate..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="addToTalentBench"
                  checked={formData.addToTalentBench}
                  onCheckedChange={(checked) => setFormData({ ...formData, addToTalentBench: checked as boolean })}
                />
                <Label htmlFor="addToTalentBench" className="text-sm font-normal cursor-pointer">
                  Add candidate to talent bench for future opportunities
                </Label>
              </div>
            </div>

            <Separator />

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
