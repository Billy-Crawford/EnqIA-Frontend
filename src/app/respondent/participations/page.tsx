// src/app/respondent/participations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { surveysService } from "@/services/surveys.service";

export default function ParticipationsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await surveysService.getMyParticipations();
    setItems(data);
  };

  return (
    <div className="space-y-6 select-none max-w-4xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Mes participations</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Registre historique de vos contributions scientifiques et réponses sécurisées.</p>
      </div>

      {/* FEED PARTICIPATIONS LIST */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.survey_id}
            className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl hover:border-blue-500/40 transition-all group"
          >
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#A9B4CC]">
                <span>Archivé avec succès</span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 bg-[#0B1220] border border-[#24314D]/60 px-3.5 py-2 rounded-xl font-mono text-xs">
              <span className="text-[#A9B4CC]/60 block text-[10px] uppercase font-bold tracking-wider mb-0.5">Validation</span>
              <span className="text-[#EAF0FF]">{new Date(item.answered_at).toLocaleString()}</span>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-12 text-center border border-dashed border-[#24314D] rounded-2xl">
            <p className="text-xs text-[#A9B4CC]/40 font-medium font-mono">Aucun enregistrement de réponse trouvé dans la base.</p>
          </div>
        )}
      </div>
    </div>
  );
}