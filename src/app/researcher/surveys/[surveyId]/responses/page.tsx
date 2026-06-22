// src/app/researcher/surveys/[surveyId]/responses/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { answersService } from "@/services/answers.service";

export default function SurveyResponsesPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    gender: "",
    age_group: "",
    date: "",
  });

  useEffect(() => {
    load();
  }, [filters]);

  const load = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();

      if (filters.gender) query.append("gender", filters.gender);
      if (filters.age_group) query.append("age_group", filters.age_group);
      if (filters.date) query.append("date", filters.date);

      const data = await answersService.getSurveyAnswers(
        Number(surveyId),
        query.toString()
      );
      setAnswers(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 select-none max-w-6xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Réponses de l'enquête</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Segmentation par filtres démographiques indexés.</p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111A2E]/50 border border-[#24314D]/60 rounded-2xl p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Genre</label>
          <select
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all cursor-pointer"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">Tous les genres</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Tranche d'âge</label>
          <input
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all"
            placeholder="Ex: 18-25"
            value={filters.age_group}
            onChange={(e) => setFilters({ ...filters, age_group: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Date de collecte</label>
          <input
            type="date"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all color-scheme-dark"
            style={{ colorScheme: "dark" }}
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#0B1220] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 text-left">Répondant</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Question</th>
                <th className="p-4 text-left">Réponse</th>
                <th className="p-4 text-left">Horodatage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24314D]/50">
              {answers.map((answer) => (
                <tr key={answer.answer_id} className="hover:bg-[#1A2742]/30 transition-colors">
                  <td className="p-4 font-bold text-white">{answer.respondent_name}</td>
                  <td className="p-4 font-mono text-xs text-[#EAF0FF]">{answer.respondent_email}</td>
                  <td className="p-4 text-[#A9B4CC] max-w-xs truncate font-medium">{answer.question}</td>
                  <td className="p-4">
                    <span className="text-white font-medium bg-[#0B1220] px-2.5 py-1.5 rounded-lg border border-[#24314D]/60 inline-block text-xs">
                      {answer.question_type === "multiple_choice"
                        ? answer.multiple_choices?.join(", ")
                        : answer.value}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-mono text-[#A9B4CC]/80">
                    {new Date(answer.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {answers.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs font-medium text-[#A9B4CC]/50">
                    Aucune entrée de données correspondante.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="text-center font-mono text-xs text-blue-400 py-4">
          Extraction du flux de données...
        </div>
      )}
    </div>
  );
}

