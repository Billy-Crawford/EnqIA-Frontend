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
    if (!confirm("Voulez-vous définitivement supprimer ce protocole d'enquête ?")) {
      return;
    }
    await surveysService.delete(id);
    load();
  };

  return (
    <div className="space-y-6 select-none max-w-6xl">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#24314D]/40 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Mes enquêtes</h1>
          <p className="text-sm text-[#A9B4CC] mt-1 font-medium">Registre complet de vos structures d'échantillonnage.</p>
        </div>

        <Link
          href="/researcher/surveys/create"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/10 active:scale-95 shrink-0"
        >
          + Nouvelle enquête
        </Link>
      </div>

      {/* SURVEYS TABLE MANAGEMENT */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0B1220] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 text-left w-20 font-mono">ID</th>
                <th className="p-4 text-left">Intitulé scientifique</th>
                <th className="p-4 text-left w-32">Statut réseau</th>
                <th className="p-4 text-center w-96">Matrice d'actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24314D]/50">
              {surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-[#1A2742]/30 transition-colors">
                  <td className="p-4 font-mono text-xs text-[#A9B4CC]">#{survey.id}</td>
                  
                  <td className="p-4">
                    <span className="font-bold text-white text-sm block tracking-wide">{survey.title}</span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        survey.is_published
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {survey.is_published ? "En ligne" : "Brouillon"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      <Link
                        href={`/researcher/surveys/${survey.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24314D] hover:bg-[#162238] text-white text-xs font-semibold transition-colors"
                      >
                        Ouvrir
                      </Link>

                      {/* <Link
                        href={`/researcher/surveys/${survey.id}/edit`}
                        className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24314D] hover:text-amber-400 text-[#A9B4CC] text-xs font-semibold transition-colors"
                      >
                        Éditer
                      </Link> */}

                      <Link
                        href={`/researcher/surveys/${survey.id}/questions`}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold transition-colors"
                      >
                        Questions
                      </Link>

                      {survey.is_published ? (
                        <button
                          onClick={() => unpublish(survey.id)}
                          className="px-3 py-1.5 rounded-lg bg-amber-600/10 border border-amber-500/20 hover:bg-amber-600 text-amber-400 hover:text-white text-xs font-bold transition-colors"
                        >
                          Dépublier
                        </button>
                      ) : (
                        <button
                          onClick={() => publish(survey.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold transition-colors"
                        >
                          Publier
                        </button>
                      )}

                      <button
                        onClick={() => remove(survey.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {surveys.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-xs text-[#A9B4CC]/40 font-medium">
                    Aucun registre d'enquête disponible. Initialisez un nouveau protocole.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}