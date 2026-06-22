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
    { label: "Dashboard", href: "/respondent/dashboard" },
    { label: "Enquêtes", href: "/respondent/surveys" },
    { label: "Mes participations", href: "/respondent/participations", badge: "Data" },
    { label: "Profil", href: "/respondent/profile" },
  ];

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#070C14] text-white">
        {/* MOBILE HEADER */}
        <header className="md:hidden sticky top-0 z-50 bg-[#111A2E] border-b border-[#24314D] px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-black text-blue-500 text-xl tracking-tight">EnqIA</h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Répondant</p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl border border-[#24314D] bg-[#0B1220] flex items-center justify-center text-white font-mono text-xl"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </header>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
            <div className="w-72 h-full bg-[#111A2E] border-r border-[#24314D] p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="font-black text-xl text-blue-500 tracking-tight">EnqIA</h2>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Espace personnel</p>
                </div>

                <nav className="space-y-1">
                  {menu.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                          active ? "bg-blue-600 text-white font-bold" : "text-[#A9B4CC] hover:bg-[#0B1220] hover:text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold uppercase tracking-wider ${
                            active ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-red-400 hover:bg-red-600/10 hover:border-red-500/20 transition-all"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:flex w-72 bg-[#111A2E] border-r border-[#24314D] flex-col justify-between min-h-screen sticky top-0">
            <div className="flex-1">
              <div className="p-6 border-b border-[#24314D]/40">
                <h1 className="text-2xl font-black text-blue-500 tracking-tight">EnqIA</h1>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC] mt-0.5">Espace personnel</p>
              </div>

              <nav className="p-4 space-y-1">
                {menu.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                        active ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/10" : "text-[#A9B4CC] hover:bg-[#0B1220] hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold uppercase tracking-wider ${
                          active ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-[#24314D]/40 space-y-4">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              >
                Déconnexion
              </button>
              <div className="text-center">
                <p className="text-[10px] font-mono text-[#A9B4CC]/40 tracking-wider uppercase">Portal v1.0 • Secure Session</p>
              </div>
            </div>
          </aside>

          {/* MAIN PAGE CONTAINER */}
          <main className="flex-1 min-w-0">
            <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}