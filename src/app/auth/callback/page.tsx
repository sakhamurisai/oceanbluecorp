"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserManager } from "@/lib/auth/AuthContext";
import { UserRole } from "@/lib/auth";

export default function CallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const userManager = getUserManager();

        // Process the callback - this will exchange the code for tokens
        const user = await userManager.signinRedirectCallback();

        if (user) {
          // Get user role from groups
          const groups = (user.profile as Record<string, unknown>)["cognito:groups"] as string[] || [];

          // Redirect based on role
          if (groups.includes("admin")) {
            router.push("/admin");
          } else if (groups.includes("hr")) {
            router.push("/admin/applications");
          } else {
            router.push("/dashboard");
          }
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <svg
              className="h-8 w-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Authentication Failed</h1>
          <p className="mt-2 text-red-300 text-sm">{error}</p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <h1 className="text-xl font-bold text-white">Signing you in...</h1>
        <p className="mt-2 text-blue-200">Please wait while we complete authentication</p>
      </div>
    </div>
  );
}
