// src/app/admin/logs/page.tsx
"use client";

import { useEffect, useState } from "react";
import { logsService } from "@/services/logs.service";

interface Log {
  id: number;
  user_id: number;
  action: string;
  created_at: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logsService
      .getAll()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-[#111A2E] rounded-md w-64"></div>
        <div className="h-64 bg-[#111A2E] border border-[#24314D] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* En-tête */}
      <div className="border-b border-[#24314D]/40 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Journal des activités
        </h1>
        <p className="text-sm text-[#A9B4CC] mt-1">
          Historique d'audit des actions critiques exécutées sur la plateforme.
        </p>
      </div>

      {/* Conteneur de Tableau d'Audit */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#0E1626] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4 w-40">Opérateur</th>
                <th className="p-4">Action effectuée</th>
                <th className="p-4 w-52 text-right">Horodatage</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#24314D]/50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-[#A9B4CC]/60 font-medium">
                    Aucune entrée dans le journal d'activité.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1A2742]/40 transition-colors">
                    {/* ID unique du Log */}
                    <td className="p-4 text-center font-mono font-bold text-[#A9B4CC]/70">
                      {log.id}
                    </td>

                    {/* ID Utilisateur déclencheur */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#24314D] text-xs font-mono font-bold text-blue-400">
                        👤 #{log.user_id}
                      </span>
                    </td>

                    {/* Libellé de l'action */}
                    <td className="p-4 font-medium text-white tracking-wide">
                      {log.action}
                    </td>

                    {/* Date précise */}
                    <td className="p-4 text-right font-mono text-xs text-[#A9B4CC]/80">
                      {new Date(log.created_at).toLocaleString("fr-FR")}
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

