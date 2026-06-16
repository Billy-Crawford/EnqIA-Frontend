// src/app/admin/surveys/page.tsx


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { surveysService } from "@/services/surveys.service";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const data = await surveysService.getAll();

      setSurveys(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublish = async (survey: any) => {
    try {
      if (survey.is_published) {
        await surveysService.unpublish(survey.id);
      } else {
        await surveysService.publish(survey.id);
      }

      await load();
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (id: number) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette enquête ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await surveysService.delete(id);

      await load();
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer l'enquête");
    }
  };

  if (loading) {
    return (
      <div className="text-text-secondary">
        Chargement des enquêtes...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Gestion des enquêtes
          </h1>

          <p className="text-text-secondary mt-1">
            Administration des enquêtes de la plateforme
          </p>
        </div>

        <Link
          href="/admin/surveys/create"
          className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
        >
          Nouvelle enquête
        </Link>

      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-bg">
            <tr>
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Titre
              </th>

              <th className="p-4 text-left">
                Chercheur
              </th>

              <th className="p-4 text-left">
                Statut
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {surveys.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-text-secondary"
                >
                  Aucune enquête trouvée
                </td>
              </tr>
            )}

            {surveys.map((survey) => (
              <tr
                key={survey.id}
                className="border-t border-border"
              >
                <td className="p-4">
                  {survey.id}
                </td>

                <td className="p-4 font-medium">
                  {survey.title}
                </td>

                <td className="p-4">
                  #{survey.researcher_id}
                </td>

                <td className="p-4">
                  {survey.is_published ? (
                    <span className="text-green-400">
                      Publié
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      Brouillon
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">

                    <Link
                      href={`/admin/surveys/${survey.id}`}
                      className="px-3 py-1 rounded bg-slate-700 text-white"
                    >
                      Voir
                    </Link>

                    <Link
                      href={`/admin/surveys/${survey.id}/edit`}
                      className="px-3 py-1 rounded bg-blue-600 text-white"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() =>
                        togglePublish(survey)
                      }
                      className="px-3 py-1 rounded bg-primary text-white"
                    >
                      {survey.is_published
                        ? "Dépublier"
                        : "Publier"}
                    </button>

                    <button
                      onClick={() =>
                        remove(survey.id)
                      }
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Supprimer
                    </button>

                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

