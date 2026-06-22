// src/app/admin/surveys/[surveyId]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { surveysService } from "@/services/surveys.service";
import Link from "next/link";

export default function SurveyDetails({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const [survey, setSurvey] = useState<any>(null);
  const id = Number(surveyId);

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    const load = async () => {
      const data = await surveysService.getById(id);
      setSurvey(data);
    };

    load();
  }, [id]);

  if (!survey) {
    return (
      <div className="space-y-6 animate-pulse max-w-5xl">
        <div className="h-12 bg-[#111A2E] rounded-xl w-2/3"></div>
        <div className="h-64 bg-[#111A2E] border border-[#24314D] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none max-w-5xl">
      {/* HEADER + ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#24314D]/40 pb-6">
        <div>
          <Link href="/admin/surveys" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
            ← Liste des enquêtes
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            {survey.title}
          </h1>
          <p className="text-sm text-[#A9B4CC] mt-2 max-w-2xl leading-relaxed">
            {survey.description || "Aucune description fournie pour cette enquête."}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/admin/surveys/${id}/edit`}
            className="flex-1 md:flex-none text-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-600/10"
          >
            Modifier l'enquête
          </Link>

          <Link
            href={`/admin/surveys/${id}/questions`}
            className="flex-1 md:flex-none text-center px-4 py-2.5 bg-[#1A2742] hover:bg-[#223254] text-[#EAF0FF] font-semibold rounded-xl border border-[#24314D] transition-all text-sm"
          >
            Gérer les questions
          </Link>
        </div>
      </div>

      {/* BLOC QUESTIONS ACCORDION */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-[#24314D] flex justify-between items-center bg-[#0E1626]">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Questions intégrées</h2>
            <p className="text-xs text-[#A9B4CC]">Ordre séquentiel d'affichage des entrées</p>
          </div>

          <Link
            href={`/admin/surveys/${id}/questions/create`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all shadow-md shadow-blue-600/15"
          >
            + Ajouter une question
          </Link>
        </div>

        <div className="p-6 space-y-3">
          {!survey.questions || survey.questions.length === 0 ? (
            <p className="text-sm text-[#A9B4CC]/60 text-center py-6">Aucune question dans cette enquête.</p>
          ) : (
            survey.questions.map((q: any) => (
              <div
                key={q.id}
                className="p-4 bg-[#0B1220] border border-[#24314D] hover:border-blue-500/30 rounded-xl flex justify-between items-center transition-colors group"
              >
                <div>
                  <p className="font-semibold text-white text-sm tracking-wide group-hover:text-blue-400 transition-colors">{q.title}</p>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded mt-1.5 font-mono">
                    {q.type}
                  </span>
                </div>

                <Link
                  href={`/admin/surveys/${id}/questions/${q.id}/edit`}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/10"
                >
                  Modifier
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

