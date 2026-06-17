// src/app/researcher/surveys/[surveyId]/page.tsx

"use client";

import { use, useEffect, useState } from "react";

import Link from "next/link";

import { surveysService } from "@/services/surveys.service";

export default function ResearcherSurveyDetails({
  params,
}: {
  params: Promise<{
    surveyId: string;
  }>;
}) {
  const { surveyId } = use(params);

  const [survey, setSurvey] = useState<any>(null);

  useEffect(() => {
    loadSurvey();
  }, [surveyId]);

  const loadSurvey = async () => {
    const data = await surveysService.getById(
      Number(surveyId)
    );

    setSurvey(data);
  };

  const publishSurvey = async () => {
    await surveysService.publish(
      Number(surveyId)
    );

    loadSurvey();
  };

  const unpublishSurvey = async () => {
    await surveysService.unpublish(
      Number(surveyId)
    );

    loadSurvey();
  };

  if (!survey) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              {survey.title}
            </h1>

            <p className="text-text-secondary mt-2">
              {survey.description}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              survey.is_published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {survey.is_published
              ? "Publié"
              : "Brouillon"}
          </span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Informations
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-bg">
            <p className="text-text-secondary text-sm">
              ID
            </p>

            <p className="font-bold text-xl">
              {survey.id}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-bg">
            <p className="text-text-secondary text-sm">
              Questions
            </p>

            <p className="font-bold text-xl">
              {survey.questions?.length || 0}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-bg">
            <p className="text-text-secondary text-sm">
              Statut
            </p>

            <p className="font-bold text-xl">
              {survey.is_published
                ? "Publié"
                : "Brouillon"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/researcher/surveys/${survey.id}/edit`}
          className="px-4 py-2 rounded-lg bg-primary text-white"
        >
          Modifier
        </Link>

        <Link
          href={`/researcher/surveys/${survey.id}/questions`}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
        >
          Questions
        </Link>

        <Link
          href={`/researcher/surveys/${survey.id}/responses`}
          className="px-4 py-2 rounded-lg bg-green-600 text-white"
        >
          Réponses
        </Link>

        <Link
          href={`/researcher/surveys/${survey.id}/analytics`}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white"
        >
          Analytics
        </Link>

        {survey.is_published ? (
          <button
            onClick={unpublishSurvey}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Dépublier
          </button>
        ) : (
          <button
            onClick={publishSurvey}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Publier
          </button>
        )}
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Questions de l'enquête
        </h2>

        <div className="space-y-3">
          {survey.questions?.map((q: any) => (
            <div
              key={q.id}
              className="p-4 rounded-lg border border-border"
            >
              <div className="font-medium">
                {q.title}
              </div>

              <div className="text-sm text-text-secondary">
                {q.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


