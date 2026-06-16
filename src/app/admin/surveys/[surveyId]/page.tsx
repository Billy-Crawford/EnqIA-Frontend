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

  if (!survey) return <div>Chargement...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER + ACTIONS */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            {survey.title}
          </h1>

          <p className="text-text-secondary">
            {survey.description}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/admin/surveys/${id}/edit`}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Modifier survey
          </Link>

          <Link
            href={`/admin/surveys/${id}/questions`}
            className="px-4 py-2 bg-surface border border-border rounded"
          >
            Gérer questions
          </Link>
        </div>
      </div>

      {/* QUESTIONS */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">Questions</h2>

          <Link
            href={`/admin/surveys/${id}/questions/create`}
            className="px-3 py-2 bg-primary text-white rounded"
          >
            + Ajouter
          </Link>
        </div>

        <div className="space-y-3">
          {survey.questions?.map((q: any) => (
            <div
              key={q.id}
              className="p-3 border border-border rounded-lg flex justify-between"
            >
              <div>
                <p className="font-medium">{q.title}</p>
                <p className="text-sm text-text-secondary">
                  {q.type}
                </p>
              </div>

              <Link
                href={`/admin/surveys/${id}/questions/${q.id}/edit`}
                className="text-primary text-sm"
              >
                Modifier
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}