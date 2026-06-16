// src/app/admin/surveys/[surveyId]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { surveysService } from "@/services/surveys.service";

export default function SurveyDetails({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params); // ✅ FIX OFFICIEL NEXT 16

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

  if (!survey) return <div>Chargement...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{survey.title}</h1>

      <p className="text-text-secondary">
        {survey.description}
      </p>

      <div className="bg-surface border border-border rounded-xl p-4">
        <h2 className="font-bold mb-3">Questions</h2>

        <div className="space-y-3">
          {survey.questions?.map((q: any) => (
            <div
              key={q.id}
              className="p-3 border border-border rounded-lg"
            >
              <p className="font-medium">{q.title}</p>
              <p className="text-sm text-text-secondary">{q.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

