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

  // 🔥 FILTRES
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Réponses du survey
      </h1>

      {/* ================= FILTERS ================= */}
      <div className="grid md:grid-cols-3 gap-4 bg-surface border border-border p-4 rounded-xl">

        {/* GENDER */}
        <select
          className="p-2 border border-border rounded bg-bg"
          value={filters.gender}
          onChange={(e) =>
            setFilters({
              ...filters,
              gender: e.target.value,
            })
          }
        >
          <option value="">Tous les genres</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>

        {/* AGE GROUP */}
        <input
          className="p-2 border border-border rounded bg-bg"
          placeholder="18-25"
          value={filters.age_group}
          onChange={(e) =>
            setFilters({
              ...filters,
              age_group: e.target.value,
            })
          }
        />

        {/* DATE */}
        <input
          type="date"
          className="p-2 border border-border rounded bg-bg"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
            })
          }
        />
      </div>

      {/* ================= TABLE ================= */}
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
            {answers.map((answer) => (
              <tr key={answer.answer_id} className="border-t border-border">
                <td className="p-3">{answer.respondent_name}</td>
                <td className="p-3">{answer.respondent_email}</td>
                <td className="p-3">{answer.question}</td>
                <td className="p-3">
                  {answer.question_type === "multiple_choice"
                    ? answer.multiple_choices?.join(", ")
                    : answer.value}
                </td>
                <td className="p-3">
                  {new Date(answer.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

