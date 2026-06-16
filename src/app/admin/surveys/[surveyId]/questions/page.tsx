// src/app/admin/surveys/[surveyId]/questions/page.tsx

"use client";

import { useEffect, useState } from "react";
import { questionsService } from "@/services/questions.service";
import Link from "next/link";

export default function SurveyQuestionsPage({
  params,
}: {
  params: { surveyId: string };
}) {
  const id = Number(params.surveyId);

  const [questions, setQuestions] = useState<any[]>([]);

  const load = async () => {
    if (!id || Number.isNaN(id)) return;

    const data = await questionsService.getBySurvey(id);
    setQuestions(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const remove = async (qid: number) => {
    await questionsService.delete(qid);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Questions du survey #{id}
        </h1>

        <Link
          href={`/admin/surveys/${id}/questions/create`}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Ajouter question
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
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
              <tr key={q.id} className="border-t border-border">
                <td className="p-3">{q.id}</td>
                <td className="p-3">{q.title}</td>
                <td className="p-3">{q.type}</td>

                <td className="p-3 flex gap-2">
                  <Link
                    href={`/admin/surveys/${id}/questions/${q.id}/edit`}
                    className="px-3 py-1 bg-primary text-white rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => remove(q.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
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

