// src/app/researcher/surveys/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { surveysService } from "@/services/surveys.service";

export default function CreateSurveyPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Le titre de l'enquête est obligatoire.");
      return;
    }

    try {
      setLoading(true);
      await surveysService.create(form);
      router.push("/researcher/surveys");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du protocole.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6 select-none">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Nouvelle enquête</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Initialiser un nouveau protocole de collecte de données.</p>
      </div>

      {/* INPUT FORM CONTAINER */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Intitulé de l'enquête</label>
          <input
            type="text"
            placeholder="Ex: Évaluation de l'impact socio-économique..."
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Description ou Note méthodologique</label>
          <textarea
            rows={5}
            placeholder="Détaillez le cadre scientifique, les objectifs empiriques et les consignes destinées aux répondants..."
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* CONTROL ACTION */}
        <div className="pt-4 border-t border-[#24314D]/40 text-right">
          <button
            onClick={submit}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all shadow-md shadow-blue-600/10 active:scale-95"
          >
            {loading ? "Création du registre..." : "Créer l'enquête"}
          </button>
        </div>
      </div>
    </div>
  );
}