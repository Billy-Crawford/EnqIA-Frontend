// src/app/admin/surveys/[surveyId]/questions/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { questionsService } from "@/services/questions.service";
import Link from "next/link";

export default function SurveyQuestionsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const id = Number(surveyId);
  const [questions, setQuestions] = useState<any[]>([]);

  const load = async () => {
    const data = await questionsService.getBySurvey(id);
    setQuestions(data);
  };

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;
    load();
  }, [id]);

  const remove = async (qid: number) => {
    const confirmed = window.confirm("Confirmer la suppression de cette question ?");
    if (!confirmed) return;
    await questionsService.delete(qid);
    load();
  };

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#24314D]/40 pb-6">
        <div>
          <Link href={`/admin/surveys/${id}`} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
            ← Fiche descriptive de l'enquête
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Questions de l'enquête #{id}
          </h1>
        </div>

        <Link
          href={`/admin/surveys/${id}/questions/create`}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
        >
          Ajouter une question
        </Link>
      </div>

      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-[#0E1626] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4">Énoncé / Titre de la question</th>
                <th className="p-4 w-44">Type structurel</th>
                <th className="p-4 w-48 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#24314D]/50">
              {questions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[#A9B4CC]/60 font-medium">
                    Aucune question répertoriée.
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q.id} className="hover:bg-[#1A2742]/40 transition-colors">
                    <td className="p-4 text-center font-mono font-bold text-[#A9B4CC]/70">{q.id}</td>
                    <td className="p-4 font-semibold text-white">{q.title}</td>
                    <td className="p-4">
                      <span className="inline-block text-[10px] font-bold font-mono tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded">
                        {q.type}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/surveys/${id}/questions/${q.id}/edit`}
                          className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-lg border border-blue-500"
                        >
                          Éditer
                        </Link>

                        <button
                          type="button"
                          onClick={() => remove(q.id)}
                          className="text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors px-3 py-1.5 rounded-lg border border-red-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

