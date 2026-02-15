import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or sign up to Ocean Blue Corporation",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages don't use header/footer from root layout
  return <>{children}</>;
}
