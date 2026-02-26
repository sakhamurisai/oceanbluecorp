"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// Redirect to unified applications page with create mode
export default function NewCandidateApplicationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to applications page - the new unified page handles creation
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
