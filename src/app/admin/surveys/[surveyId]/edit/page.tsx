// src/app/admin/surveys/[surveyId]/edit/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { surveysService } from "@/services/surveys.service";
import Link from "next/link";

export default function EditSurveyPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const load = async () => {
      const survey = await surveysService.getById(Number(surveyId));
      setForm({
        title: survey.title,
        description: survey.description || "",
      });
    };
    load();
  }, [surveyId]);

  const submit = async () => {
    await surveysService.update(Number(surveyId), form);
    router.push("/admin/surveys");
  };

  return (
    <div className="max-w-2xl space-y-6 select-none">
      <div className="flex flex-col gap-1 border-b border-[#24314D]/40 pb-6">
        <Link href={`/admin/surveys/${surveyId}`} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
          ← Retour aux détails
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Modifier l'enquête
        </h1>
      </div>

      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Titre de l'enquête</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Description explicative</label>
          <textarea
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={submit}
            className="px-6 py-3 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

