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
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Sondage du réseau d'enquêtes...</div>;
  }

  return (
    <div className="space-y-6 select-none max-w-6xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Enquêtes disponibles</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Sélectionnez un protocole d'étude pour soumettre vos réponses.</p>
      </div>

      {surveys.length === 0 ? (
        <div className="p-8 border border-[#24314D] bg-[#111A2E]/50 rounded-2xl text-center text-xs font-medium font-mono text-[#A9B4CC]/40">
          Aucun formulaire actif n'est assigné à votre compte pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-blue-500/30 transition-all group"
            >
              <div className="space-y-2">
                <h2 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors tracking-wide">
                  {survey.title}
                </h2>
                <p className="text-xs text-[#A9B4CC] line-clamp-3 font-medium leading-relaxed">
                  {survey.description || "Aucune description de protocole fournie."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#24314D]/40 flex justify-end">
                <Link
                  href={`/respondent/surveys/${survey.id}`}
                  className="px-4 py-2 rounded-xl bg-[#0B1220] border border-[#24314D] group-hover:bg-blue-600 group-hover:border-blue-600 text-white text-xs font-bold transition-all active:scale-95 shadow-md"
                >
                  Participer à l'étude →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}