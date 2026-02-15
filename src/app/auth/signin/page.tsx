"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { isAuthenticated, isLoading, signIn } = useAuth();
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-blue-200">Sign in to your Ocean Blue account</p>
          </div>

          {/* Sign In Button */}
          <button
            onClick={signIn}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Sign In with Cognito
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20" />
            <span className="px-4 text-sm text-blue-200">or</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-blue-200">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign up
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
          By signing in, you agree to our{" "}
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
