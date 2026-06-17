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

  // LOAD SURVEYS
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

  // LOAD ANSWERS
  useEffect(() => {
    if (!surveyId) return;
    loadAnswers();
  }, [surveyId]);

  const loadAnswers = async () => {
    setLoading(true);

    try {
      const data = await answersService.getSurveyAnswers(
        surveyId!
      );

      setAnswers(data);
    } finally {
      setLoading(false);
    }
  };

  // FILTER FRONTEND (simple & efficace)
  const filtered = answers.filter((a) => {
    const matchGender =
      !filters.gender || a.gender === filters.gender;

    const matchSearch =
      !filters.search ||
      a.respondent_email
        ?.toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      a.respondent_name
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    return matchGender && matchSearch;
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Réponses des enquêtes
        </h1>
        <p className="text-text-secondary">
          Consultation des données brutes
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* SURVEY SELECT */}
        <select
          className="p-3 border border-border rounded bg-surface"
          value={surveyId ?? ""}
          onChange={(e) =>
            setSurveyId(Number(e.target.value))
          }
        >
          {surveys.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        {/* GENDER */}
        <select
          className="p-3 border border-border rounded bg-surface"
          value={filters.gender}
          onChange={(e) =>
            setFilters({
              ...filters,
              gender: e.target.value,
            })
          }
        >
          <option value="">Tous genres</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>

        {/* SEARCH */}
        <input
          className="p-3 border border-border rounded bg-surface"
          placeholder="Recherche nom / email"
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
        />
      </div>

      {/* TABLE */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-bg">
            <tr>
              <th className="p-3 text-left">Répondant</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Réponse</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.answer_id}
                className="border-t border-border"
              >

                <td className="p-3">
                  <div className="font-medium">
                    {a.respondent_name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {a.gender ?? "-"} / {a.age ?? "-"}
                  </div>
                </td>

                <td className="p-3">
                  {a.respondent_email}
                </td>

                <td className="p-3">
                  {a.question}
                </td>

                <td className="p-3">
                  {a.question_type === "multiple_choice"
                    ? a.multiple_choices?.join(", ")
                    : a.value}
                </td>

                <td className="p-3">
                  {new Date(a.created_at).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {loading && (
        <div className="text-center text-text-secondary">
          Chargement...
        </div>
      )}

    </div>
  );
}
