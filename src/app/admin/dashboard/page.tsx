// src/app/admin/dashboard/page.tsx
"use client";

import Card from "@/components/ui/Card";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div>
          <div className="h-8 bg-[#111A2E] rounded-md w-64"></div>
          <div className="h-4 bg-[#111A2E] rounded-md w-96 mt-3"></div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-28 bg-[#111A2E] border border-[#24314D] rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      {/* En-tête de section */}
      <div className="border-b border-[#24314D]/40 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Dashboard Administrateur
        </h1>
        <p className="text-base text-[#A9B4CC] mt-2">
          Vue globale et indicateurs clés d'activité de la plateforme EnqIA.
        </p>
      </div>

      {/* Grille des indicateurs statistiques */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card title="Utilisateurs Globaux" value={data.users} />

        <Card title="Chercheurs Enregistrés" value={data.researchers} />

        <Card title="Répondants Actifs" value={data.respondents} />

        <Card title="Total Enquêtes" value={data.surveys} />

        <Card title="Questions Créées" value={data.questions} />

        <Card title="Réponses Collectées" value={data.responses} />

        <Card title="Enquêtes Publiées" value={data.published_surveys} className="border-blue-500/30 bg-gradient-to-b from-[#111A2E] to-blue-950/20" />
      </div>
    </div>
  );
}

