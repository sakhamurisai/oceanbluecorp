"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Redirect to unified applications page
export default function ViewCandidateApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  useEffect(() => {
    // Redirect to applications page - user can view the application there
    router.replace("/admin/applications");
  }, [router, id]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
        <p className="text-muted-foreground text-sm">Redirecting to Applications...</p>
      </div>
    </div>
  );
}
