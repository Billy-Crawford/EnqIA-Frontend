"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { dashboardService } from "@/services/dashboard.service";
import { useAuthStore } from "@/store/auth.store";

export default function RespondentDashboardPage() {
  const [stats, setStats] = useState<any>(null);

  const user = useAuthStore(
    (s) => s.user
  );

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data =
      await dashboardService.getRespondentDashboard();

    setStats(data);
  };

  if (!stats) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Bonjour {user?.firstname}
        </h1>

        <p className="text-text-secondary mt-1">
          Participez aux enquêtes disponibles
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-text-secondary">
            Enquêtes disponibles
          </p>

          <p className="text-4xl font-bold mt-2">
            {stats.available_surveys}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-text-secondary">
            Réponses envoyées
          </p>

          <p className="text-4xl font-bold mt-2">
            {stats.answers}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-text-secondary">
            Enquêtes participées
          </p>

          <p className="text-4xl font-bold mt-2">
            {stats.participations}
          </p>
        </div>

      </div>

      <div className="bg-surface border border-border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Actions rapides
        </h2>

        <div className="flex gap-3">

          <Link
            href="/respondent/surveys"
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Voir les enquêtes
          </Link>

          <Link
            href="/respondent/participations"
            className="px-4 py-2 border border-border rounded-lg"
          >
            Mes participations
          </Link>

        </div>

      </div>

    </div>
  );
}

