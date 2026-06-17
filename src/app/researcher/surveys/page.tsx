// src/app/researcher/surveys/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { surveysService } from "@/services/surveys.service";

export default function ResearcherSurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);

  const load = async () => {
    const data = await surveysService.getAll();
    setSurveys(data);
  };

  useEffect(() => {
    load();
  }, []);

  const publish = async (id: number) => {
    await surveysService.publish(id);
    load();
  };

  const unpublish = async (id: number) => {
    await surveysService.unpublish(id);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Supprimer cette enquête ?")) {
      return;
    }

    await surveysService.delete(id);

    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Mes enquêtes
        </h1>

        <Link
          href="/researcher/surveys/create"
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Nouvelle enquête
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg">
            <tr>
              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Titre
              </th>

              <th className="p-3 text-left">
                Statut
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {surveys.map((survey) => (
              <tr
                key={survey.id}
                className="border-t border-border"
              >
                <td className="p-3">
                  {survey.id}
                </td>

                <td className="p-3">
                  {survey.title}
                </td>

                <td className="p-3">
                  {survey.is_published
                    ? "Publié"
                    : "Brouillon"}
                </td>

                <td className="p-3 flex flex-wrap gap-2">
                  <Link
                    href={`/researcher/surveys/${survey.id}`}
                    className="px-3 py-1 bg-primary text-white rounded"
                  >
                    Ouvrir
                  </Link>

                  <Link
                    href={`/researcher/surveys/${survey.id}/edit`}
                    className="px-3 py-1 bg-yellow-600 text-white rounded"
                  >
                    Modifier
                  </Link>

                  <Link
                    href={`/researcher/surveys/${survey.id}/questions`}
                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    Questions
                  </Link>

                  {survey.is_published ? (
                    <button
                      onClick={() =>
                        unpublish(survey.id)
                      }
                      className="px-3 py-1 bg-orange-600 text-white rounded"
                    >
                      Dépublier
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        publish(survey.id)
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Publier
                    </button>
                  )}

                  <button
                    onClick={() =>
                      remove(survey.id)
                    }
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

