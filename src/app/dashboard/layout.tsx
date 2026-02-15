import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Ocean Blue Corporation dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dashboard has its own header, so we don't use the root header/footer
  return <>{children}</>;
}
