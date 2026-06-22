// src/app/researcher/surveys/[surveyId]/analytics/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { statisticsService } from "@/services/statistics.service";
import { surveysService } from "@/services/surveys.service";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function ResearcherAnalyticsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState({ gender: "", age_group: "", date: "" });

  const load = async () => {
    const data = await statisticsService.getSurveyStatistics(Number(surveyId), filters);
    setStats(data);
  };

  useEffect(() => {
    load();
  }, [filters]);

  const exportCSV = async () => {
    try {
      const blob = await surveysService.exportCsv(Number(surveyId));
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `survey_${surveyId}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export CSV défaillant", err);
    }
  };

  const exportExcel = async () => {
    try {
      const blob = await surveysService.exportExcel(Number(surveyId));
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `survey_${surveyId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export Excel défaillant", err);
    }
  };

  if (!stats) {
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Compilation analytique en cours...</div>;
  }

  return (
    <div className="space-y-6 select-none max-w-5xl">
      {/* HEADER WITH EXPORTS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24314D]/40 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Analytics — {stats.title}</h1>
          <p className="text-sm text-[#A9B4CC] mt-1">Métriques quantitatives et distribution empirique.</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#111A2E] border border-[#24314D] text-white hover:bg-[#1C2B4B] transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={exportExcel}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* CRITERIA SEGMENTATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111A2E]/40 border border-[#24314D]/60 p-4 rounded-2xl">
        <select
          className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none"
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">Tous les genres (Sexe)</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none"
          placeholder="Tranche d'âge (ex: 18-25)"
          value={filters.age_group}
          onChange={(e) => setFilters({ ...filters, age_group: e.target.value })}
        />

        <input
          type="date"
          className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none"
          style={{ colorScheme: "dark" }}
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      {/* METRICS PANELS */}
      <div className="space-y-6">
        {stats.statistics.map((item: any, index: number) => (
          <div key={index} className="p-6 border border-[#24314D] rounded-2xl bg-[#111A2E] shadow-xl">
            <h2 className="text-base font-bold text-white tracking-wide mb-6">
              <span className="font-mono text-xs text-[#A9B4CC]/50 mr-2">BLOCK #{index + 1}</span>
              {item.question}
            </h2>

            {/* SINGLE CHOICE (PIE) */}
            {item.type === "single_choice" && (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(item.distribution).map(([name, value]) => ({ name, value }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      stroke="#111A2E"
                      strokeWidth={3}
                    >
                      {Object.keys(item.distribution).map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0B1220", borderColor: "#24314D", borderRadius: "12px", color: "#FFF" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* MULTIPLE CHOICE / LIKERT (BAR) */}
            {(item.type === "multiple_choice" || item.type === "likert") && (
              <div className="space-y-4">
                {item.type === "likert" && (
                  <div className="flex gap-4 p-3 bg-[#0B1220] rounded-xl border border-[#24314D]/50 text-xs font-mono max-w-sm">
                    <span className="text-[#A9B4CC]">Moyenne: <b className="text-blue-400">{item.average}</b></span>
                    <span className="w-[1px] bg-[#24314D]" />
                    <span className="text-[#A9B4CC]">Médiane: <b className="text-emerald-400">{item.median}</b></span>
                  </div>
                )}
                <div className="h-[300px] w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(item.distribution).map(([name, value]) => ({ name, value }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#24314D/40" vertical={false} />
                      <XAxis dataKey="name" stroke="#A9B4CC" tickLine={false} />
                      <YAxis stroke="#A9B4CC" tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0B1220", borderColor: "#24314D", borderRadius: "12px", color: "#FFF" }} />
                      <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* OPEN TEXT */}
            {item.type === "text" && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 divide-y divide-[#24314D]/30">
                {item.responses?.map((r: string, i: number) => (
                  <div key={i} className="py-3 font-medium text-sm text-[#EAF0FF]">
                    {r}
                  </div>
                ))}
                {(!item.responses || item.responses.length === 0) && (
                  <div className="text-xs text-[#A9B4CC]/40 py-4">Aucun enregistrement textuel.</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}