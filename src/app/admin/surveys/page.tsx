"use client";

import { useEffect, useState } from "react";
import { surveysService } from "@/services/surveys.service";

export default function AdminSurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const data = await surveysService.getAll();

    setSurveys(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const publish = async (id: number) => {
    await surveysService.publish(id);
    loadData();
  };

  const unpublish = async (id: number) => {
    await surveysService.unpublish(id);
    loadData();
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des enquêtes</h1>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Titre</th>

              <th className="p-4 text-left">Chercheur</th>

              <th className="p-4 text-left">Statut</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id} className="border-b border-border">
                <td className="p-4">{survey.id}</td>

                <td className="p-4">{survey.title}</td>

                <td className="p-4">#{survey.researcher_id}</td>

                <td className="p-4">
                  {survey.is_published ? "Publié" : "Brouillon"}
                </td>

                <td className="p-4 flex gap-2">
                  {survey.is_published ? (
                    <button
                      onClick={() => unpublish(survey.id)}
                      className="px-3 py-1 rounded bg-red-600"
                    >
                      Retirer
                    </button>
                  ) : (
                    <button
                      onClick={() => publish(survey.id)}
                      className="px-3 py-1 rounded bg-green-600"
                    >
                      Publier
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

