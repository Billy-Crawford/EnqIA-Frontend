"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    // ADMIN
    if (
      pathname.startsWith("/admin") &&
      user.role !== "admin"
    ) {
      router.replace("/login");
      return;
    }

    // RESEARCHER
    if (
      pathname.startsWith("/researcher") &&
      user.role !== "researcher"
    ) {
      router.replace("/login");
      return;
    }

    // RESPONDENT
    if (
      pathname.startsWith("/app") &&
      user.role !== "respondent"
    ) {
      router.replace("/login");
      return;
    }
  }, [hydrated, user, pathname, router]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
