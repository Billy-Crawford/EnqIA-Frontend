// src/app/respondent/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";
import { useAuthStore } from "@/store/auth.store";

export default function RespondentDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await dashboardService.getRespondentDashboard();
    setStats(data);
  };

  if (!stats) {
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Initialisation du tableau de bord...</div>;
  }

  return (
    <div className="space-y-6 select-none">
      {/* WELCOME BAR */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Bonjour, {user?.firstname}</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Consultez et complétez les protocoles d'enquêtes de recherche actifs.</p>
      </div>

      {/* METRICS METERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Formulaires ouverts</p>
          <p className="text-4xl font-mono font-black text-blue-400 mt-2">{stats.available_surveys}</p>
        </div>

        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Réponses enregistrées</p>
          <p className="text-4xl font-mono font-black text-white mt-2">{stats.answers}</p>
        </div>

        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Feuilles complétées</p>
          <p className="text-4xl font-mono font-black text-emerald-400 mt-2">{stats.participations}</p>
        </div>
      </div>

      {/* SHORTCUTS ACTIONS BLOCK */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Actions recommandées</h2>
          <p className="text-xs text-[#A9B4CC] mt-0.5">Accédez directement aux formulaires en attente de traitement.</p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <Link
            href="/respondent/surveys"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/10 active:scale-95"
          >
            Contribuer aux enquêtes
          </Link>

          <Link
            href="/respondent/participations"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-[#A9B4CC] hover:text-white transition-colors"
          >
            Vérifier mes contributions
          </Link>
        </div>
      </div>
    </div>
  );
}