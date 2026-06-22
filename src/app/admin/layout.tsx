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
      <div className="min-h-screen bg-[#0B1220] text-[#EAF0FF] flex">
        {/* Sidebar */}
        <aside className="w-72 bg-[#111A2E] border-r border-[#24314D] flex flex-col justify-between select-none">
          <div>
            {/* Header Sidebar */}
            <div className="p-6 border-b border-[#24314D]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-600/20">
                  E
                </span>
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">EnqIA</h1>
                  <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase">Administration</p>
                </div>
              </div>
            </div>

            {/* Menu Navigation */}
            <nav className="p-4 space-y-1.5">
              {menu.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center justify-between
                      px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                      ${
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                          : "text-[#A9B4CC] hover:bg-[#1A2742] hover:text-[#EAF0FF]"
                      }
                    `}
                  >
                    <span>{item.label}</span>

                    {item.badge && (
                      <span
                        className={`
                          text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors
                          ${active ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"}
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Sidebar */}
          <div className="p-6 border-t border-[#24314D] bg-[#0E1626]">
            <p className="text-xs font-semibold text-[#A9B4CC]">EnqIA Admin Dashboard</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[11px] text-[#A9B4CC]/50">Version 1.0</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-[#0B1220]">
          <div className="p-8 max-w-[1600px] mx-auto w-full">{children}</div>
        </main>
      </div>
    </RouteGuard>
  );
}

