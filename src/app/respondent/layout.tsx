// src/app/respondent/layout.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import RouteGuard from "@/components/auth/RouteGuard";

import { authStorage } from "@/lib/auth-storage";
import { useAuthStore } from "@/store/auth.store";

export default function RespondentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = useAuthStore((s) => s.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authStorage.clear();

    logout();

    router.push("/login");
  };

  const menu = [
    {
      label: "Dashboard",
      href: "/respondent/dashboard",
    },
    {
      label: "Enquêtes",
      href: "/respondent/surveys",
    },
    {
      label: "Mes participations",
      href: "/respondent/participations",
      badge: "Data",
    },
    {
      label: "Profil",
      href: "/respondent/profile",
    },
  ];

  return (
    <RouteGuard>
      <div className="min-h-screen bg-bg text-text-primary">
        {/* MOBILE HEADER */}
        <header
          className="
            md:hidden
            sticky top-0 z-50
            bg-surface
            border-b border-border
            px-4 py-4
            flex items-center justify-between
          "
        >
          <div>
            <h1 className="font-bold text-primary text-xl">EnqIA</h1>

            <p className="text-xs text-text-secondary">Répondant</p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              w-10 h-10
              rounded-lg
              border border-border
              flex items-center justify-center
            "
          >
            ☰
          </button>
        </header>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden
              fixed inset-0
              z-50
              bg-black/50
            "
          >
            <div
              className="
                w-72 h-full
                bg-surface
                border-r border-border
                p-6
                flex flex-col
              "
            >
              <div className="mb-6">
                <h2 className="font-bold text-xl text-primary">EnqIA</h2>

                <p className="text-sm text-text-secondary">Répondant</p>
              </div>

              <nav className="flex-1 space-y-2">
                {menu.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center justify-between
                        px-4 py-3 rounded-xl
                        transition
                        ${active ? "bg-primary text-white" : "hover:bg-bg"}
                      `}
                    >
                      <span>{item.label}</span>

                      {item.badge && (
                        <span
                          className={`
                            text-xs px-2 py-1 rounded-full
                            ${
                              active
                                ? "bg-white/20"
                                : "bg-primary/15 text-primary"
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  py-3
                  rounded-lg
                  border border-border
                  hover:bg-bg
                  transition
                "
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}

        <div className="flex">
          {/* DESKTOP SIDEBAR */}
          <aside
            className="
              hidden md:flex
              w-72
              bg-surface
              border-r border-border
              flex-col
              min-h-screen
            "
          >
            <div className="p-6 border-b border-border">
              <h1 className="text-2xl font-bold text-primary">EnqIA</h1>

              <p className="text-sm text-text-secondary mt-1">Répondant</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {menu.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between
                      px-4 py-3 rounded-xl transition
                      ${active ? "bg-primary text-white" : "hover:bg-bg"}
                    `}
                  >
                    <span>{item.label}</span>

                    {item.badge && (
                      <span
                        className={`
                          text-xs px-2 py-1 rounded-full
                          ${
                            active
                              ? "bg-white/20"
                              : "bg-primary/15 text-primary"
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-border">
              <button
                onClick={handleLogout}
                className="
                  w-full
                  py-3
                  rounded-lg
                  border border-border
                  hover:bg-bg
                  transition
                "
              >
                Déconnexion
              </button>

              <p className="text-xs text-text-secondary mt-4">
                EnqIA Respondent Portal
              </p>

              <p className="text-xs text-text-secondary mt-1">Version 1.0</p>
            </div>
          </aside>

          {/* CONTENT */}
          <main className="flex-1 min-w-0">
            <div className="p-4 md:p-8">{children}</div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
