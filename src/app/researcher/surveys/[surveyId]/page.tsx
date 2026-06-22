// src/app/researcher/surveys/[surveyId]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { surveysService } from "@/services/surveys.service";

export default function ResearcherSurveyDetails({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const [survey, setSurvey] = useState<any>(null);

  useEffect(() => {
    loadSurvey();
  }, [surveyId]);

  const loadSurvey = async () => {
    const data = await surveysService.getById(Number(surveyId));
    setSurvey(data);
  };

  const publishSurvey = async () => {
    await surveysService.publish(Number(surveyId));
    loadSurvey();
  };

  const unpublishSurvey = async () => {
    await surveysService.unpublish(Number(surveyId));
    loadSurvey();
  };

  if (!survey) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-[#111A2E] rounded-2xl border border-[#24314D]" />
        <div className="h-32 bg-[#111A2E] rounded-2xl border border-[#24314D]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none max-w-5xl">
      {/* HERO HEADER STATUS */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tight">{survey.title}</h1>
          <p className="text-sm text-[#A9B4CC] leading-relaxed max-w-2xl">{survey.description}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider font-mono uppercase border shrink-0 ${
            survey.is_published
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          }`}
        >
          {survey.is_published ? "En ligne" : "Brouillon"}
        </span>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#111A2E] border border-[#24314D] shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Index ID</p>
          <p className="font-mono font-bold text-xl text-white mt-1">#{survey.id}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111A2E] border border-[#24314D] shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Blocs de questions</p>
          <p className="font-mono font-bold text-xl text-blue-400 mt-1">{survey.questions?.length || 0}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111A2E] border border-[#24314D] shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#A9B4CC]">Visibilité réseau</p>
          <p className="font-bold text-sm text-white mt-1.5">{survey.is_published ? "Échantillonnage actif" : "Édition restreinte"}</p>
        </div>
      </div>

      {/* CONTROLS ACTIONS BAR */}
      <div className="flex flex-wrap gap-2 bg-[#111A2E]/40 border border-[#24314D]/60 p-3 rounded-2xl">
        {/* <Link
          href={`/researcher/surveys/${survey.id}/edit`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-white hover:bg-[#1A2742] transition-colors"
        >
          Configuration de base
        </Link> */}

        <Link
          href={`/researcher/surveys/${survey.id}/questions`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Éditeur de questions
        </Link>

        <Link
          href={`/researcher/surveys/${survey.id}/responses`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-[#A9B4CC] hover:text-white transition-colors"
        >
          Réponses brutes
        </Link>

        <Link
          href={`/researcher/surveys/${survey.id}/analytics`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-[#A9B4CC] hover:text-white transition-colors"
        >
          Statistiques
        </Link>

        <div className="h-7 w-[1px] bg-[#24314D] self-center mx-1 hidden sm:block" />

        {survey.is_published ? (
          <button
            onClick={unpublishSurvey}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all ml-auto"
          >
            Dépublier le formulaire
          </button>
        ) : (
          <button
            onClick={publishSurvey}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all ml-auto"
          >
            Déployer et Publier
          </button>
        )}
      </div>

      {/* QUESTIONS SUMMARY LIST */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Structure ordonnée des questions</h2>

        <div className="space-y-2.5">
          {survey.questions?.map((q: any, i: number) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-[#0B1220] border border-[#24314D]/70 flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white leading-tight">
                  <span className="font-mono text-xs text-[#A9B4CC] mr-1.5">{i + 1}.</span>
                  {q.title}
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10 shrink-0">
                {q.type}
              </span>
            </div>
          ))}
          {(!survey.questions || survey.questions.length === 0) && (
            <p className="text-xs text-[#A9B4CC]/40 text-center py-6">Aucune question n'a encore été rattachée à cette enquête.</p>
          )}
        </div>
      </div>
    </div>
  );
}

