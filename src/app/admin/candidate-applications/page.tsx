"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Redirect to unified applications page
export default function CandidateApplicationsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/applications");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
        <p className="text-muted-foreground text-sm">Redirecting to Applications...</p>
      </div>
    </div>
  );
}
