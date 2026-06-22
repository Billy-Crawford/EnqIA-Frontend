// src/app/researcher/surveys/[surveyId]/questions/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { questionsService } from "@/services/questions.service";

export default function ResearcherSurveyQuestionsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const [questions, setQuestions] = useState<any[]>([]);

  const load = async () => {
    const data = await questionsService.getBySurvey(Number(surveyId));
    setQuestions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Voulez-vous détruire cette variable de question de l'enquête ?")) {
      return;
    }
    await questionsService.delete(id);
    load();
  };

  return (
    <div className="space-y-6 select-none max-w-6xl">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#24314D]/40 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Configuration Questions</h1>
          <p className="text-sm text-[#A9B4CC] mt-1 font-medium">Architecture du modèle de variables et formulaires.</p>
        </div>

        <Link
          href={`/researcher/surveys/${surveyId}/questions/create`}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/10 active:scale-95 shrink-0"
        >
          + Ajouter une question
        </Link>
      </div>

      {/* CONSTRUCTED ARCHITECTURE TABLE */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0B1220] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 text-left w-20 font-mono">ID</th>
                <th className="p-4 text-left">Intitulé de la variable</th>
                <th className="p-4 text-left w-40">Type de donnée</th>
                <th className="p-4 text-center w-48">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24314D]/50">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-[#1A2742]/30 transition-colors">
                  <td className="p-4 font-mono text-xs text-[#A9B4CC]">#{q.id}</td>
                  
                  <td className="p-4">
                    <span className="font-bold text-white text-sm block tracking-wide">{q.title}</span>
                  </td>

                  <td className="p-4">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10">
                      {q.type}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/researcher/surveys/${surveyId}/questions/${q.id}/edit`}
                        className="px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#24314D] text-white hover:bg-[#1A2742] text-xs font-semibold transition-colors"
                      >
                        Modifier
                      </Link>

                      <button
                        onClick={() => remove(q.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-xs text-[#A9B4CC]/40 font-medium">
                    Aucune question configurée pour ce module d'échantillonnage.
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