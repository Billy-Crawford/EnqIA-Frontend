"use client";

import { useEffect } from "react";
import { initAuth } from "@/store/auth.init";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAuth();
  }, []);

  return <>{children}</>;
}

