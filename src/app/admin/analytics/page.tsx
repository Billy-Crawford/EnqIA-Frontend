// src/app/admin/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
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

import { surveysService } from "@/services/surveys.service";
import { statisticsService } from "@/services/statistics.service";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AnalyticsPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [surveyId, setSurveyId] = useState<number>();
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState({
    gender: "",
    age_group: "",
    date: "",
  });

  useEffect(() => {
    loadSurveys();
  }, []);

  useEffect(() => {
    if (surveyId) {
      loadStatistics();
    }
  }, [surveyId, filters]);

  const loadSurveys = async () => {
    const data = await surveysService.getAll();
    setSurveys(data);
    if (data.length > 0) {
      setSurveyId(data[0].id);
    }
  };

  const loadStatistics = async () => {
    const data = await statisticsService.getSurveyStatistics(surveyId!, filters);
    setStats(data);
  };

  const exportCsv = async () => {
    if (!surveyId) return;
    const blob = await surveysService.exportCsv(surveyId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `survey_${surveyId}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const exportExcel = async () => {
    if (!surveyId) return;
    const blob = await surveysService.exportExcel(surveyId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `survey_${surveyId}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 select-none max-w-6xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Analytics</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Analyse croisée avancée et distribution empirique</p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#111A2E]/50 border border-[#24314D]/60 rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Enquête active</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            value={surveyId}
            onChange={(e) => setSurveyId(Number(e.target.value))}
          >
            {surveys.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Genre</label>
          <select
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">Tous les genres</option>
            <option value="male">Masculin</option>
            <option value="female">Féminin</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Tranche d'âge</label>
          <input
            type="text"
            placeholder="Ex: 18-25"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={filters.age_group}
            onChange={(e) => setFilters({ ...filters, age_group: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Date d'enregistrement</label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
      </div>

      {/* EXPORTS */}
      <div className="flex gap-3">
        <button
          onClick={exportCsv}
          className="px-4 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-600/10 active:scale-95"
        >
          Exporter en CSV
        </button>

        <button
          onClick={exportExcel}
          className="px-4 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/10 active:scale-95"
        >
          Exporter sur Excel
        </button>
      </div>

      {/* RESULTS CHARTS */}
      <div className="grid grid-cols-1 gap-6">
        {stats?.statistics?.map((item: any, index: number) => (
          <div key={index} className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded mb-2 inline-block">
                {item.type}
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">{item.question}</h2>
            </div>

            {/* SINGLE CHOICE (PIE) */}
            {item.type === "single_choice" && (
              <div className="w-full h-[300px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(item.distribution).map(([name, value]) => ({ name, value }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={95}
                      stroke="#111A2E"
                      strokeWidth={3}
                      label={{ fill: '#A9B4CC', fontSize: 12, fontWeight: 'bold' }}
                    >
                      {Object.entries(item.distribution).map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0B1220', borderColor: '#24314D', borderRadius: '12px', color: '#FFF' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* MULTIPLE CHOICE (BAR) */}
            {item.type === "multiple_choice" && (
              <div className="w-full h-[300px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={Object.entries(item.distribution).map(([name, value]) => ({ name, value }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#24314D" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#A9B4CC" fontSize={11} tickLine={false} />
                    <YAxis stroke="#A9B4CC" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B1220', borderColor: '#24314D', borderRadius: '12px', color: '#FFF' }} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* LIKERT */}
            {item.type === "likert" && (
              <div className="space-y-4 pt-2">
                <div className="flex gap-6 text-xs bg-[#0B1220] border border-[#24314D] w-fit px-4 py-2 rounded-xl">
                  <div className="text-[#A9B4CC]">Moyenne : <strong className="text-white font-mono text-sm ml-1">{item.average}</strong></div>
                  <div className="w-[1px] bg-[#24314D]"></div>
                  <div className="text-[#A9B4CC]">Médiane : <strong className="text-white font-mono text-sm ml-1">{item.median}</strong></div>
                </div>

                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={Object.entries(item.distribution).map(([name, value]) => ({ name, value }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#24314D" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#A9B4CC" fontSize={11} tickLine={false} />
                      <YAxis stroke="#A9B4CC" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B1220', borderColor: '#24314D', borderRadius: '12px', color: '#FFF' }} />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TEXT RESPONSES */}
            {item.type === "text" && (
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar pt-2">
                {item.responses?.length === 0 ? (
                  <p className="text-xs text-[#A9B4CC]/40 text-center py-4">Aucune réponse textuelle soumise.</p>
                ) : (
                  item.responses?.map((response: string, i: number) => (
                    <div key={i} className="p-4 bg-[#0B1220] border border-[#24314D]/70 text-sm text-[#EAF0FF] rounded-xl leading-relaxed">
                      {response}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}