"use client";

import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";

export default function ResearcherDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await dashboardService.getResearcherDashboard();
      setStats(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-surface animate-pulse rounded" />
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-surface animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-text-secondary">
        Impossible de charger les données.
      </div>
    );
  }

  const cards = [
    {
      title: "Mes enquêtes",
      value: stats.surveys,
      hint: "Total créé",
      color: "text-blue-500",
    },
    {
      title: "Enquêtes publiées",
      value: stats.published_surveys,
      hint: "Actives",
      color: "text-green-500",
    },
    {
      title: "Questions",
      value: stats.questions,
      hint: "Total formulaires",
      color: "text-yellow-500",
    },
    {
      title: "Réponses",
      value: stats.responses,
      hint: "Données collectées",
      color: "text-purple-500",
    },
  ];

  const engagementRate =
    stats.surveys > 0
      ? ((stats.published_surveys / stats.surveys) * 100).toFixed(0)
      : 0;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard Chercheur
        </h1>

        <p className="text-text-secondary mt-1">
          Vue globale de vos activités de recherche et collecte de données
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition"
          >
            <p className="text-text-secondary text-sm">
              {card.title}
            </p>

            <p className={`text-4xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>

            <p className="text-xs text-text-secondary mt-2">
              {card.hint}
            </p>
          </div>
        ))}
      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-2">
            Taux de publication
          </h2>

          <p className="text-3xl font-bold text-primary">
            {engagementRate}%
          </p>

          <p className="text-sm text-text-secondary mt-2">
            % de vos enquêtes actuellement actives
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-2">
            Activité globale
          </h2>

          <p className="text-3xl font-bold">
            {stats.responses > 0 ? "Active" : "Faible"}
          </p>

          <p className="text-sm text-text-secondary mt-2">
            Basé sur les réponses collectées
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Actions rapides
        </h2>

        <div className="flex flex-wrap gap-3">

          <a
            href="/researcher/surveys"
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            Voir mes enquêtes
          </a>

          <a
            href="/researcher/surveys"
            className="px-4 py-2 rounded-lg border border-border"
          >
            Créer une enquête
          </a>

          <a
            href="/researcher/responses"
            className="px-4 py-2 rounded-lg border border-border"
          >
            Voir les réponses
          </a>

          <a
            href="/researcher/surveys/1/analytics"
            className="px-4 py-2 rounded-lg border border-border"
          >
            Analytics
          </a>

        </div>
      </div>

    </div>
  );
}