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
import { authStorage } from "@/lib/auth-storage";

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
    const data = await statisticsService.getSurveyStatistics(
      surveyId!,
      filters,
    );

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="text-text-secondary">Analyse avancée des enquêtes</p>
      </div>

      {/* FILTERS */}

      <div className="grid md:grid-cols-4 gap-4">
        <select
          className="p-3 rounded-lg bg-surface border border-border"
          value={surveyId}
          onChange={(e) => setSurveyId(Number(e.target.value))}
        >
          {surveys.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <select
          className="p-3 rounded-lg bg-surface border border-border"
          value={filters.gender}
          onChange={(e) =>
            setFilters({
              ...filters,
              gender: e.target.value,
            })
          }
        >
          <option value="">Genre</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="text"
          placeholder="18-25"
          className="p-3 rounded-lg bg-surface border border-border"
          value={filters.age_group}
          onChange={(e) =>
            setFilters({
              ...filters,
              age_group: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="p-3 rounded-lg bg-surface border border-border"
          value={filters.date}
          onChange={(e) =>
            setFilters({
              ...filters,
              date: e.target.value,
            })
          }
        />
      </div>

      {/* EXPORTS */}

      <div className="flex gap-3">
        <button
          onClick={exportCsv}
          className="px-4 py-2 rounded-lg bg-green-600 text-white"
        >
          Export CSV
        </button>

        <button
          onClick={exportExcel}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Export Excel
        </button>
      </div>

      {/* RESULTS */}

      {stats?.statistics?.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">{item.question}</h2>

          {/* SINGLE CHOICE */}

          {item.type === "single_choice" && (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(item.distribution).map(
                    ([name, value]) => ({
                      name,
                      value,
                    }),
                  )}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {Object.entries(item.distribution).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* MULTIPLE CHOICE */}

          {item.type === "multiple_choice" && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.entries(item.distribution).map(
                  ([name, value]) => ({
                    name,
                    value,
                  }),
                )}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* LIKERT */}

          {item.type === "likert" && (
            <>
              <div className="flex gap-8 mb-4">
                <div>
                  Moyenne :<strong> {item.average}</strong>
                </div>

                <div>
                  Médiane :<strong> {item.median}</strong>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(item.distribution).map(
                    ([name, value]) => ({
                      name,
                      value,
                    }),
                  )}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* TEXT */}

          {item.type === "text" && (
            <div className="space-y-3">
              {item.responses?.map((response: string, i: number) => (
                <div key={i} className="p-4 bg-bg rounded-lg">
                  {response}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
