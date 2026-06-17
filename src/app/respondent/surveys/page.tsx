// src/app/respondent/surveys/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { surveysService } from "@/services/surveys.service";

export default function RespondentSurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await surveysService.getAll();

      setSurveys(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enquêtes disponibles</h1>

        <p className="text-text-secondary">Répondez aux enquêtes publiées</p>
      </div>

      {surveys.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-6">
          Aucune enquête disponible.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <h2 className="font-semibold text-lg">{survey.title}</h2>

              <p className="text-text-secondary mt-2">{survey.description}</p>

              <div className="mt-4">
                <Link
                  href={`/respondent/surveys/${survey.id}`}
                  className="inline-flex px-4 py-2 rounded-lg bg-primary text-white"
                >
                  Participer
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
