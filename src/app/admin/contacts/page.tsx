"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  Eye,
  CheckCircle2,
  Archive,
  Clock,
  ChevronDown,
  ChevronUp,
  Trash2,
  Loader2,
  User,
  Briefcase,
} from "lucide-react";
import { Contact } from "@/lib/aws/dynamodb";

const statusConfig = {
  new: {
    label: "New",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  read: {
    label: "Read",
    color: "bg-yellow-100 text-yellow-700",
    icon: Eye,
  },
  responded: {
    label: "Responded",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  archived: {
    label: "Archived",
    color: "bg-gray-100 text-gray-700",
    icon: Archive,
  },
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiryFilter, setInquiryFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/contacts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch contacts");
        }

        setContacts(data.contacts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const inquiryTypes = [...new Set(contacts.map((c) => c.inquiryType).filter(Boolean))];

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesInquiry = inquiryFilter === "all" || contact.inquiryType === inquiryFilter;
    return matchesSearch && matchesStatus && matchesInquiry;
  });

  const handleStatusChange = async (contactId: string, newStatus: Contact["status"]) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (err) {
      alert("Failed to update contact status");
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    } catch (err) {
      alert("Failed to delete contact");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Job Title", "Inquiry Type", "Status", "Date", "Message"];
    const rows = filteredContacts.map((contact) => [
      `${contact.firstName} ${contact.lastName}`,
      contact.email,
      contact.phone || "",
      contact.company,
      contact.jobTitle || "",
      contact.inquiryType,
      contact.status,
      new Date(contact.createdAt).toLocaleDateString(),
      `"${contact.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    responded: contacts.filter((c) => c.status === "responded").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-500">Loading contacts...</p>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">
            View and manage contact form submissions
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={filteredContacts.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Contacts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
              <p className="text-sm text-gray-600">New</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
              <p className="text-sm text-gray-600">Read</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.responded}</p>
              <p className="text-sm text-gray-600">Responded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <select
              value={inquiryFilter}
              onChange={(e) => setInquiryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="all">All Inquiries</option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contacts list */}
      <div className="space-y-4">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            const status = statusConfig[contact.status as keyof typeof statusConfig] || statusConfig.new;
            const isExpanded = expandedId === contact.id;

            return (
              <div
                key={contact.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 transition-colors"
              >
                {/* Main row */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => {
                    setExpandedId(isExpanded ? null : contact.id);
                    // Mark as read when opened
                    if (!isExpanded && contact.status === "new") {
                      handleStatusChange(contact.id, "read");
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold">
                        {contact.firstName[0]}
                        {contact.lastName[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </h3>
                          {contact.status === "new" && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {contact.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {contact.inquiryType}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${status.color}`}
                      >
                        <status.icon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Contact Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </a>
                          {contact.phone && (
                            <a
                              href={`tel:${contact.phone}`}
                              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                            >
                              <Phone className="w-4 h-4" />
                              {contact.phone}
                            </a>
                          )}
                          <div className="flex items-center gap-2 text-gray-600">
                            <Building2 className="w-4 h-4" />
                            {contact.company}
                          </div>
                          {contact.jobTitle && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              {contact.jobTitle}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Message</h4>
                        <div className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
                          {contact.message}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Update Status
                        </h4>
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            handleStatusChange(contact.id, e.target.value as Contact["status"])
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                          <option value="archived">Archived</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${contact.email}?subject=Re: ${contact.inquiryType} Inquiry`}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                            onClick={() => {
                              if (contact.status !== "responded") {
                                handleStatusChange(contact.id, "responded");
                              }
                            }}
                          >
                            Reply via Email
                          </a>
                          <button
                            onClick={() => handleDelete(contact.id)}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {contacts.length === 0
                ? "No contact submissions yet"
                : "No contacts found matching your criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
