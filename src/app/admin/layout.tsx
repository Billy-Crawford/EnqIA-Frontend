"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RouteGuard from "@/components/auth/RouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      label: "Utilisateurs",
      href: "/admin/users",
    },
    {
      label: "Enquêtes",
      href: "/admin/surveys",
    },
    {
      label: "Réponses",
      href: "/admin/responses",
      badge: "Data",
    },
    {
      label: "Statistiques",
      href: "/admin/analytics",
      badge: "Stats",
    },
    {
      label: "Journaux",
      href: "/admin/logs",
      badge: "Logs",
    },
  ];

  return (
    <RouteGuard>
      <div className="min-h-screen bg-bg text-text-primary flex">
        {/* Sidebar */}
        <aside className="w-72 bg-surface border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary">EnqIA</h1>

            <p className="text-sm text-text-secondary mt-1">Administration</p>
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
                    px-4 py-3 rounded-xl transition-all
                    ${
                      active
                        ? "bg-primary text-white"
                        : "hover:bg-bg text-text-primary"
                    }
                  `}
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span
                      className={`
                        text-xs px-2 py-1 rounded-full
                        ${active ? "bg-white/20" : "bg-primary/15 text-primary"}
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
            <p className="text-xs text-text-secondary">EnqIA Admin Dashboard</p>

            <p className="text-xs text-text-secondary mt-1">Version 1.0</p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </RouteGuard>
  );
}
