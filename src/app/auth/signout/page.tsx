"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserManager } from "@/lib/auth/AuthContext";
import { Loader2, LogOut, AlertCircle } from "lucide-react";

export default function SignOutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSignOut, setAutoSignOut] = useState(false);

  useEffect(() => {
    // Check if this is an automatic sign-out request (e.g., from session expiry)
    const params = new URLSearchParams(window.location.search);
    if (params.get("auto") === "true") {
      setAutoSignOut(true);
      handleSignOut();
    }
  }, []);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userManager = getUserManager();

      // Get the current user before removing them (to get the id_token)
      const user = await userManager.getUser();
      const idToken = user?.id_token;

      // Remove user from local storage
      await userManager.removeUser();

      // Clear any additional storage
      localStorage.removeItem("oidc.user:" +
        `https://cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}:` +
        process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
      );

      // Clear all oidc related items from localStorage
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("oidc.")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // For production, redirect to Cognito logout endpoint
      const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
      const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
      
      // IMPORTANT: This must match EXACTLY what's registered in Cognito
      // You registered: https://oceanbluecorp.com/auth/signout
      const logoutUri = encodeURIComponent("https://oceanbluecorp.com/auth/signout");

      if (cognitoDomain && clientId) {
        let logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
        
        // Add id_token_hint if available for a cleaner logout
        if (idToken) {
          logoutUrl += `&id_token_hint=${encodeURIComponent(idToken)}`;
        }
        
        // Redirect to Cognito hosted UI logout
        window.location.href = logoutUrl;
      } else {
        // If Cognito domain is not configured, just redirect to home
        router.push("/");
      }
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err instanceof Error ? err.message : "Failed to sign out");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Logo/Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
              <LogOut className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {autoSignOut ? "Session Ended" : "Sign Out"}
          </h1>

          <p className="text-gray-500 mb-8">
            {autoSignOut
              ? "Your session has expired. Signing you out..."
              : "Are you sure you want to sign out of your account?"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-gray-500">Signing you out...</p>
            </div>
          ) : (
            /* Action Buttons */
            <div className="space-y-3">
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>

              {!autoSignOut && (
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}