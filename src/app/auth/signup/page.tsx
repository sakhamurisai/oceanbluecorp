"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const { isAuthenticated, isLoading, signUp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/10 backdrop-blur-lg p-8 shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="mt-2 text-blue-200">Join Ocean Blue Corporation</p>
          </div>

          {/* Features List */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center text-blue-200">
              <svg className="mr-3 h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access to job applications
            </div>
            <div className="flex items-center text-blue-200">
              <svg className="mr-3 h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track your application status
            </div>
            <div className="flex items-center text-blue-200">
              <svg className="mr-3 h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Get personalized job recommendations
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={signUp}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Sign Up with Cognito
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20" />
            <span className="px-4 text-sm text-blue-200">or</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-blue-200">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-blue-300 hover:text-white transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-blue-200/60">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-cyan-400 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
