// src/app/admin/responses/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { surveysService } from "@/services/surveys.service";
import { answersService } from "@/services/answers.service";

export default function ResponsesPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [surveyId, setSurveyId] = useState<number>();
  const [answers, setAnswers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSurveys();
  }, []);

  useEffect(() => {
    if (surveyId) {
      loadAnswers();
    }
  }, [surveyId]);

  const loadSurveys = async () => {
    const data = await surveysService.getAll();
    setSurveys(data);
    if (data.length > 0) {
      setSurveyId(data[0].id);
    }
  };

  const loadAnswers = async () => {
    const data = await answersService.getSurveyAnswers(surveyId!);
    setAnswers(data);
  };

  const filteredAnswers = useMemo(() => {
    return answers.filter((answer) => {
      const text = JSON.stringify(answer).toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [answers, search]);

  const uniqueRespondents = new Set(
    answers.map((a) => a.respondent_id)
  ).size;

  return (
    <div className="space-y-8 select-none">
      {/* En-tête */}
      <div className="border-b border-[#24314D]/40 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Réponses collectées
        </h1>
        <p className="text-sm text-[#A9B4CC] mt-1">
          Analyse, filtrage et consultation des contributions par enquête.
        </p>
      </div>

      {/* Cartes KPIs thématiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
            Total réponses
          </p>
          <p className="text-3xl font-black mt-3 text-white tracking-tight font-mono">
            {answers.length}
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
            Répondants uniques
          </p>
          <p className="text-3xl font-black mt-3 text-blue-400 tracking-tight font-mono">
            {uniqueRespondents}
          </p>
        </div>

        <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
            Questions répondues
          </p>
          <p className="text-3xl font-black mt-3 text-emerald-400 tracking-tight font-mono">
            {new Set(answers.map((a) => a.question_id)).size}
          </p>
        </div>
      </div>

      {/* Barre d'outils / Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111A2E]/50 border border-[#24314D]/60 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Enquête ciblée</label>
          <select
            value={surveyId}
            onChange={(e) => setSurveyId(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            {surveys.map((survey) => (
              <option key={survey.id} value={survey.id}>
                {survey.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Filtrer les résultats</label>
          <input
            type="text"
            placeholder="Rechercher un mot-clé, un nom, un email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Tableau des réponses */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-[#0E1626] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 w-64">Répondant</th>
                <th className="p-4">Question</th>
                <th className="p-4">Donnée soumise</th>
                <th className="p-4 w-52 text-right">Date d'enregistrement</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#24314D]/50">
              {filteredAnswers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[#A9B4CC]/60 font-medium">
                    Aucune donnée correspondante trouvée.
                  </td>
                </tr>
              ) : (
                filteredAnswers.map((answer) => (
                  <tr key={answer.answer_id} className="hover:bg-[#1A2742]/40 transition-colors">
                    {/* Infos Répondant */}
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">
                          {answer.respondent_name || "Anonyme"}
                        </div>
                        <div className="text-xs text-[#A9B4CC] font-mono">
                          {answer.respondent_email || "Pas d'adresse spécifiée"}
                        </div>
                      </div>
                    </td>

                    {/* Question */}
                    <td className="p-4 font-medium text-white max-w-xs truncate">
                      {answer.question}
                    </td>

                    {/* Valeur de la réponse */}
                    <td className="p-4 text-[#A9B4CC]">
                      {answer.question_type === "multiple_choice" ? (
                        <div className="flex flex-wrap gap-1">
                          {answer.multiple_choices?.map((choice: string, idx: number) => (
                            <span key={idx} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs font-medium">
                              {choice}
                            </span>
                          )) || answer.value}
                        </div>
                      ) : (
                        <span className="text-[#EAF0FF] font-medium bg-[#0B1220] border border-[#24314D] px-2.5 py-1 rounded-lg block w-fit max-w-md">
                          {answer.value}
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-right font-mono text-xs text-[#A9B4CC]/80">
                      {new Date(answer.created_at).toLocaleString("fr-FR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
