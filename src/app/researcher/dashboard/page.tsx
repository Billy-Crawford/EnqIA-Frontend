// src/app/researcher/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";
import { authService } from "@/services/auth.service";

export default function ResearcherDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const [dashboard, profile] = await Promise.all([
        dashboardService.getResearcherDashboard(),
        authService.getProfile(),
      ]);
      setStats(dashboard);
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-72 bg-[#111A2E] rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-[#111A2E] border border-[#24314D] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-sm font-semibold text-[#A9B4CC] bg-[#111A2E] border border-[#24314D] p-6 rounded-2xl text-center">
        Impossible de charger les données d'analyse du tableau de bord.
      </div>
    );
  }

  const cards = [
    { title: "Mes enquêtes", value: stats.surveys, hint: "Total créé", color: "text-white" },
    { title: "Enquêtes publiées", value: stats.published_surveys, hint: "Actives sur le réseau", color: "text-emerald-400" },
    { title: "Questions", value: stats.questions, hint: "Total formulaires", color: "text-blue-400" },
    { title: "Réponses", value: stats.responses, hint: "Données collectées", color: "text-purple-400" },
  ];

  const engagementRate =
    stats.surveys > 0
      ? ((stats.published_surveys / stats.surveys) * 100).toFixed(0)
      : 0;

  return (
    <div className="space-y-8 select-none relative">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Dashboard Chercheur</h1>
          <p className="text-sm text-[#A9B4CC] mt-1">
            Bienvenue, <span className="font-bold text-white">{user?.firstname} {user?.lastname}</span>
          </p>
        </div>
        <div className="text-right font-mono text-xs text-[#A9B4CC] bg-[#111A2E] border border-[#24314D] px-3 py-1.5 rounded-xl">
          {user?.email} • <span className="text-blue-400 uppercase font-bold">{user?.role}</span>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[120px] transition-all hover:border-[#24314D]/100"
          >
            <p className="text-xs font-bold text-[#A9B4CC] uppercase tracking-wider">{card.title}</p>
            <p className={`text-4xl font-black font-mono tracking-tight my-2 ${card.color}`}>
              {card.value}
            </p>
            <p className="text-[11px] text-[#A9B4CC]/60">{card.hint}</p>
          </div>
        ))}
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Taux de publication</h2>
          <p className="text-3xl font-black font-mono text-blue-400 pt-1">{engagementRate}%</p>
          <p className="text-xs text-[#A9B4CC]/70 pt-2 leading-relaxed">
            Pourcentage global de vos enquêtes scientifiques actuellement actives pour échantillonnage.
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Activité globale</h2>
          <p className={`text-3xl font-black pt-1 ${stats.responses > 0 ? "text-emerald-400" : "text-amber-400"}`}>
            {stats.responses > 0 ? "Active" : "Faible"}
          </p>
          <p className="text-xs text-[#A9B4CC]/70 pt-2 leading-relaxed">
            Statut calculé dynamiquement sur la base des flux récents de réponses collectées.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#A9B4CC] mb-4">Actions de terrain rapides</h2>

        <div className="flex flex-wrap gap-2.5">
          <a
            href="/researcher/surveys"
            className="px-4 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white text-xs transition-colors shadow-md shadow-blue-600/10"
          >
            Consulter mes enquêtes
          </a>

          <a
            href="/researcher/surveys"
            className="px-4 py-2.5 rounded-xl font-semibold bg-[#0B1220] border border-[#24314D] text-[#EAF0FF] hover:bg-[#1A2742] text-xs transition-colors"
          >
            Créer une nouvelle enquête
          </a>

          <a
            href="/researcher/responses"
            className="px-4 py-2.5 rounded-xl font-semibold bg-[#0B1220] border border-[#24314D] text-[#EAF0FF] hover:bg-[#1A2742] text-xs transition-colors"
          >
            Données de réponses
          </a>

          <a
            href="/researcher/surveys/1/analytics"
            className="px-4 py-2.5 rounded-xl font-semibold bg-[#0B1220] border border-[#24314D] text-[#EAF0FF] hover:bg-[#1A2742] text-xs transition-colors"
          >
            Analyses & graphiques
          </a>
        </div>
      </div>
    </div>
  );
}
