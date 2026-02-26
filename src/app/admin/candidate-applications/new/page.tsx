"use client";

import { useState, useEffect } from "react";
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

export default function NewCandidateApplicationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hrUsers, setHrUsers] = useState<CognitoUser[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    fetchJobs();
    fetchUsers();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      if (response.ok) {
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (response.ok) {
        const users = data.users || [];
        setHrUsers(users.filter((u: CognitoUser) => u.role === "hr" || u.role === "admin"));
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      // Fall back to predefined HR users
      setHrUsers(HR_USERS.map(u => ({ ...u, email: "", role: "hr", status: "active" })));
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

      const applicationData = {
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
        createdBy: user?.id || "system",
        createdByName: user?.name || user?.email?.split("@")[0] || "System",
        rating: formData.rating || undefined,
        notes: formData.notes || undefined,
        addToTalentBench: formData.addToTalentBench,
      };

      const response = await fetch("/api/candidate-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create application");
      }

      router.push("/admin/candidate-applications");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create application");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">New Candidate Application</h1>
          <p className="text-muted-foreground text-sm">Create a new candidate application</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                Create Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
