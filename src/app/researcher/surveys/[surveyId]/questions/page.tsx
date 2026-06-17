// src/app/researcher/surveys/[surveyId]/questions/page.tsx

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

import { questionsService } from "@/services/questions.service";

export default function ResearcherSurveyQuestionsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);

  const [questions, setQuestions] = useState<any[]>([]);

  const load = async () => {
    const data = await questionsService.getBySurvey(
      Number(surveyId)
    );

    setQuestions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: number) => {
    if (!confirm("Supprimer cette question ?")) {
      return;
    }

    await questionsService.delete(id);

    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Questions
        </h1>

        <Link
          href={`/researcher/surveys/${surveyId}/questions/create`}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Ajouter
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((q) => (
              <tr
                key={q.id}
                className="border-t border-border"
              >
                <td className="p-3">{q.id}</td>

                <td className="p-3">
                  {q.title}
                </td>

                <td className="p-3">
                  {q.type}
                </td>

                <td className="p-3 flex gap-2">
                  <Link
                    href={`/researcher/surveys/${surveyId}/questions/${q.id}/edit`}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() => remove(q.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

