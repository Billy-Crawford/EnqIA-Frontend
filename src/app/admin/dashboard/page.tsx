// src/app/admin/dashboard/page.tsx
"use client";

import Card from "@/components/ui/Card";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) {
    return <div>Chargement du dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>

        <p className="text-text-secondary mt-2">
          Vue globale de la plateforme EnqIA.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card title="Utilisateurs" value={data.users} />

        <Card title="Chercheurs" value={data.researchers} />

        <Card title="Répondants" value={data.respondents} />

        <Card title="Enquêtes" value={data.surveys} />

        <Card title="Questions" value={data.questions} />

        <Card title="Réponses" value={data.responses} />

        <Card title="Enquêtes publiées" value={data.published_surveys} />
      </div>
    </div>
  );
}




