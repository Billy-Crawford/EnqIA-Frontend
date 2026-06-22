// src/app/admin/surveys/[surveyId]/questions/[questionId]/edit/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";
import Link from "next/link";

export default function EditQuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string; questionId: string }>;
}) {
  const router = useRouter();
  const { surveyId, questionId } = use(params);

  const [form, setForm] = useState({
    title: "",
    type: "",
  });

  useEffect(() => {
    const load = async () => {
      // Optionnel si l'API possède un endpoint dédié direct
    };
    load();
  }, [questionId]);

  const submit = async () => {
    await questionsService.update(Number(questionId), form);
    router.push(`/admin/surveys/${surveyId}/questions`);
  };

  return (
    <div className="max-w-xl space-y-6 select-none">
      <div className="flex flex-col gap-1 border-b border-[#24314D]/40 pb-6">
        <Link href={`/admin/surveys/${surveyId}/questions`} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
          ← Retour à la liste des questions
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Modifier la question
        </h1>
      </div>

      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Énoncé de la question</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Type de réponse attendu</label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer appearance-none"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="text">Texte libre</option>
              <option value="single_choice">Choix unique (Radio)</option>
              <option value="multiple_choice">Choix multiples (Checkbox)</option>
              <option value="likert">Échelle de Likert</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={submit}
            className="px-6 py-3 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
          >
            Sauvegarder la question
          </button>
        </div>
      </div>
    </div>
  );
}

