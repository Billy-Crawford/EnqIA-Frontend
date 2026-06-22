// src/app/researcher/surveys/[surveyId]/questions/[questionId]/edit/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";

export default function EditQuestionPage({
  params,
}: {
  params: Promise<{
    surveyId: string;
    questionId: string;
  }>;
}) {
  const { surveyId, questionId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    type: "text",
    options: [] as string[],
  });

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const questions = await questionsService.getBySurvey(Number(surveyId));
      const question = questions.find((q: any) => q.id === Number(questionId));

      if (!question) {
        alert("Question introuvable dans ce registre.");
        return;
      }

      setForm({
        title: question.title,
        type: question.type,
        options: question.options || [],
      });
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!form.title.trim()) {
      alert("L'intitulé de la question ne peut pas être vide.");
      return;
    }
    await questionsService.update(Number(questionId), form);
    router.push(`/researcher/surveys/${surveyId}/questions`);
  };

  if (loading) {
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Chargement de la variable...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6 select-none">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Modifier la question</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Mise à jour des paramètres de la variable d'enquête.</p>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Intitulé / Libellé de la question</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Format de réponse attendu</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="text">Texte libre (Open-ended)</option>
            <option value="single_choice">Choix unique (Radio)</option>
            <option value="multiple_choice">Choix multiple (Checkbox)</option>
            <option value="likert">Échelle de Likert (1-5)</option>
          </select>
        </div>

        {/* CONTROLS */}
        <div className="pt-4 border-t border-[#24314D]/40 flex justify-end gap-2">
          <button
            onClick={() => router.push(`/researcher/surveys/${surveyId}/questions`)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B1220] border border-[#24314D] text-[#A9B4CC] hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={submit}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-600/10 active:scale-95"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
}