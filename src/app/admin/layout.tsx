"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useAuth, UserRole } from "@/lib/auth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: [UserRole.ADMIN] },
  { name: "Content", href: "/admin/content", icon: FileText, roles: [UserRole.ADMIN] },
  { name: "Job Postings", href: "/admin/jobs", icon: Briefcase, roles: [UserRole.ADMIN, UserRole.HR] },
  { name: "Applications", href: "/admin/applications", icon: Users, roles: [UserRole.ADMIN, UserRole.HR] },
  { name: "Settings", href: "/admin/settings", icon: Settings, roles: [UserRole.ADMIN] },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, signOut, hasAnyRole } = useAuth();

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter((item) => hasAnyRole(item.roles));

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case UserRole.ADMIN:
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case UserRole.HR:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0a192f] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">OB</span>
              </div>
              <span className="text-white font-semibold">Admin Panel</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                {getUserInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border capitalize ${getRoleBadgeColor()}`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="mt-2 py-2 rounded-lg bg-white/10 border border-white/10">
                <p className="px-4 py-1 text-xs text-gray-400 truncate">{user?.email}</p>
                <div className="my-2 border-t border-white/10" />
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}

            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-gray-300 focus:outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {getUserInitials()}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.HR]}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ProtectedRoute>
  );
}
