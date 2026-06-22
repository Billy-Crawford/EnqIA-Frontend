// src/app/admin/surveys/[surveyId]/questions/create/page.tsx
"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";
import Link from "next/link";

export default function CreateQuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const router = useRouter();
  const { surveyId } = use(params);
  const id = Number(surveyId);

  const [form, setForm] = useState({
    title: "",
    type: "text",
    options: "",
  });

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      console.error("Invalid surveyId:", surveyId);
    }
  }, [id, surveyId]);

  const submit = async () => {
    if (!id || Number.isNaN(id)) return;

    await questionsService.create(id, {
      title: form.title,
      type: form.type,
      options:
        form.type === "text"
          ? null
          : form.options.split(",").map((o) => o.trim()),
    });

    router.push(`/admin/surveys/${id}/questions`);
  };

  return (
    <div className="max-w-xl space-y-6 select-none">
      <div className="flex flex-col gap-1 border-b border-[#24314D]/40 pb-6">
        <Link href={`/admin/surveys/${id}/questions`} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
          ← Retour aux questions
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Créer une question
        </h1>
      </div>

      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Intitulé de la question</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            placeholder="Ex: Quel est votre niveau d'expérience en IA ?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Format de réponse</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="text">Texte libre</option>
            <option value="single_choice">Choix unique (Radio)</option>
            <option value="multiple_choice">Choix multiples (Checkbox)</option>
            <option value="likert">Échelle de Likert</option>
          </select>
        </div>

        {form.type !== "text" && (
          <div className="flex flex-col gap-1.5 animate-fadeIn">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Options de choix</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Débutant, Intermédiaire, Expert"
              value={form.options}
              onChange={(e) => setForm({ ...form, options: e.target.value })}
            />
            <p className="text-[11px] text-[#A9B4CC]/60 mt-0.5">Séparez chaque option disponible par une simple virgule.</p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={submit}
            className="px-6 py-3 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
          >
            Créer la question
          </button>
        </div>
      </div>
    </div>
  );
}

