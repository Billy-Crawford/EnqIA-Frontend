// src/app/researcher/surveys/[surveyId]/questions/create/page.tsx
"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";

export default function CreateQuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    type: "text",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Le libellé de la question est obligatoire.");
      return;
    }

    try {
      setLoading(true);
      await questionsService.create(Number(surveyId), form);
      router.push(`/researcher/surveys/${surveyId}/questions`);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout de la question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6 select-none">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Nouvelle question</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Injecter un nouveau point de collecte au formulaire.</p>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Intitulé / Libellé de la question</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex: Quelle est votre fréquence d'utilisation de notre infrastructure ?"
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
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all shadow-md shadow-blue-600/10 active:scale-95"
          >
            {loading ? "Création du bloc..." : "Créer et ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}