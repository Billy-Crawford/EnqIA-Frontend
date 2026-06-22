// src/app/researcher/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RouteGuard from "@/components/auth/RouteGuard";

export default function ResearcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/researcher/dashboard" },
    { label: "Mes enquêtes", href: "/researcher/surveys" },
    { label: "Réponses", href: "/researcher/responses", badge: "Data" },
    { label: "Statistiques", href: "/researcher/surveys/1/analytics", badge: "Stats" },
    { label: "Profil", href: "/researcher/profile" },
  ];

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#070C14] text-[#EAF0FF] flex select-none">
        {/* SIDEBAR */}
        <aside className="w-72 bg-[#111A2E] border-r border-[#24314D] flex flex-col shrink-0">
          <div className="p-6 border-b border-[#24314D]/60">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm">E</span>
              <h1 className="text-xl font-black text-white tracking-wider uppercase">
                Enq<span className="text-blue-500">IA</span>
              </h1>
            </div>
            <p className="text-xs text-[#A9B4CC] font-bold tracking-wide uppercase mt-2">
              Espace Chercheur
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1.5">
            {menu.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between
                    px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                        : "hover:bg-[#1A2742] text-[#A9B4CC] hover:text-white"
                    }
                  `}
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span
                      className={`
                        text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md font-mono
                        ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/10"
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

          <div className="p-5 border-t border-[#24314D]/60 bg-[#0E1626]/50">
            <p className="text-[11px] font-bold tracking-wider uppercase text-[#A9B4CC]/40">
              EnqIA Core System
            </p>
            <p className="text-xs text-[#A9B4CC]/60 mt-0.5 font-mono">
              v1.0.0 @ 2026
            </p>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
