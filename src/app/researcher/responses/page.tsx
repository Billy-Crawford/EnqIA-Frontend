// src/app/researcher/responses/page.tsx
"use client";

import { useEffect, useState } from "react";
import { answersService } from "@/services/answers.service";
import { surveysService } from "@/services/surveys.service";

export default function ResearcherResponsesPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [surveyId, setSurveyId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    search: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = await surveysService.getAll();
      setSurveys(data);
      if (data.length > 0) {
        setSurveyId(data[0].id);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!surveyId) return;
    loadAnswers();
  }, [surveyId]);

  const loadAnswers = async () => {
    setLoading(true);
    try {
      const data = await answersService.getSurveyAnswers(surveyId!);
      setAnswers(data);
    } finally {
      setLoading(false);
    }
  };

  const filtered = answers.filter((a) => {
    const matchGender = !filters.gender || a.gender === filters.gender;
    const matchSearch =
      !filters.search ||
      a.respondent_email?.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.respondent_name?.toLowerCase().includes(filters.search.toLowerCase());

    return matchGender && matchSearch;
  });

  return (
    <div className="space-y-6 select-none max-w-6xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Réponses des enquêtes</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Consultation et filtrage des données brutes récoltées</p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111A2E]/50 border border-[#24314D]/60 rounded-2xl p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Enquête cible</label>
          <select
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all cursor-pointer"
            value={surveyId ?? ""}
            onChange={(e) => setSurveyId(Number(e.target.value))}
          >
            {surveys.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

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
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Filtrer un répondant</label>
          <input
            className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all"
            placeholder="Recherche nom / email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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
                <th className="p-4 text-left">Date de soumission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24314D]/50">
              {filtered.map((a) => (
                <tr key={a.answer_id} className="hover:bg-[#1A2742]/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{a.respondent_name}</div>
                    <div className="text-xs font-mono text-[#A9B4CC] mt-0.5 uppercase">
                      {a.gender ?? "-"} • {a.age ? `${a.age} ans` : "-"}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-[#EAF0FF]">{a.respondent_email}</td>
                  <td className="p-4 text-[#A9B4CC] max-w-xs truncate font-medium">{a.question}</td>
                  <td className="p-4">
                    <span className="text-white font-medium bg-[#0B1220] px-2.5 py-1.5 rounded-lg border border-[#24314D]/60 inline-block text-xs">
                      {a.question_type === "multiple_choice" ? a.multiple_choices?.join(", ") : a.value}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-mono text-[#A9B4CC]/80">
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs font-medium text-[#A9B4CC]/50">
                    Aucune donnée brute disponible pour cette sélection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="text-center font-mono text-xs text-blue-400 py-4">
          Synchronisation des flux de données en cours...
        </div>
      )}
    </div>
  );
}