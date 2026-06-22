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
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-[#111A2E] rounded-md w-64"></div>
            <div className="h-4 bg-[#111A2E] rounded-md w-80 mt-2"></div>
          </div>
          <div className="h-10 bg-[#111A2E] rounded-xl w-36"></div>
        </div>
        <div className="h-64 bg-[#111A2E] border border-[#24314D] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#24314D]/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Gestion des enquêtes
          </h1>

          <p className="text-base text-[#A9B4CC] mt-1">
            Administration et supervision des enquêtes de la plateforme.
          </p>
        </div>

        <Link
          href="/admin/surveys/create"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
        >
          + Nouvelle enquête
        </Link>
      </div>

      {/* Conteneur de Tableau */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-[#0E1626] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4">Titre de l'enquête</th>
                <th className="p-4 w-40">Créateur</th>
                <th className="p-4 w-36">Statut</th>
                <th className="p-4 w-64 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#24314D]/50">
              {surveys.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-12 text-center text-[#A9B4CC]/60 font-medium"
                  >
                    Aucune enquête trouvée dans la base de données.
                  </td>
                </tr>
              )}

              {surveys.map((survey) => (
                <tr
                  key={survey.id}
                  className="hover:bg-[#1A2742]/40 transition-colors group"
                >
                  {/* ID */}
                  <td className="p-4 text-center font-mono font-bold text-[#A9B4CC]/70">
                    {survey.id}
                  </td>

                  {/* Titre */}
                  <td className="p-4 font-semibold text-white max-w-xs truncate">
                    {survey.title}
                  </td>

                  {/* Chercheur */}
                  <td className="p-4 text-[#A9B4CC] font-medium">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0B1220] border border-[#24314D] text-xs font-mono">
                      👤 #{survey.researcher_id}
                    </span>
                  </td>

                  {/* Statut avec Badge Contrasté */}
                  <td className="p-4">
                    {survey.is_published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Publié
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        Brouillon
                      </span>
                    )}
                  </td>

                  {/* Actions de contrôle */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-90 group-hover:opacity-100">
                      <Link
                        href={`/admin/surveys/${survey.id}`}
                        className="text-xs font-bold text-white bg-slate-700 hover:bg-slate-600 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-600"
                      >
                        Voir
                      </Link>

                      <Link
                        href={`/admin/surveys/${survey.id}/edit`}
                        className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors px-2.5 py-1.5 rounded-lg border border-blue-500"
                      >
                        Modifier
                      </Link>

                      <button
                        type="button"
                        onClick={() => togglePublish(survey)}
                        className={`text-xs font-bold text-white transition-colors px-2.5 py-1.5 rounded-lg border ${
                          survey.is_published
                            ? "bg-amber-600 hover:bg-amber-500 border-amber-500"
                            : "bg-emerald-600 hover:bg-emerald-500 border-emerald-500"
                        }`}
                      >
                        {survey.is_published ? "Dépublier" : "Publier"}
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(survey.id)}
                        className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors px-2.5 py-1.5 rounded-lg border border-red-500"
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
    </div>
  );
}