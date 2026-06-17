// src/app/researcher/surveys/[surveyId]/analytics/page.tsx

"use client";

import { useEffect, useState } from "react";
import { use } from "react";
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

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function ResearcherAnalyticsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);

  const [stats, setStats] = useState<any>(null);

  const [filters, setFilters] = useState({
    gender: "",
    age_group: "",
    date: "",
  });

  // LOAD STATS
  const load = async () => {
    const data = await statisticsService.getSurveyStatistics(
      Number(surveyId),
      filters
    );

    setStats(data);
  };

  useEffect(() => {
    load();
  }, [filters]);

  // =========================
  // EXPORT CSV
  // =========================
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
      console.error("CSV export failed", err);
    }
  };

  // =========================
  // EXPORT EXCEL
  // =========================
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
      console.error("Excel export failed", err);
    }
  };

  if (!stats) return <div>Chargement...</div>;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Analytics - {stats.title}
        </h1>
        <p className="text-text-secondary">
          Analyse des réponses du survey
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-4">

        <select
          className="p-3 border border-border rounded bg-surface"
          value={filters.gender}
          onChange={(e) =>
            setFilters({ ...filters, gender: e.target.value })
          }
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          className="p-3 border border-border rounded bg-surface"
          placeholder="18-25"
          value={filters.age_group}
          onChange={(e) =>
            setFilters({ ...filters, age_group: e.target.value })
          }
        />

        <input
          type="date"
          className="p-3 border border-border rounded bg-surface"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />
      </div>

      {/* EXPORT BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Export CSV
        </button>

        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Export Excel
        </button>
      </div>

      {/* CHARTS */}
      <div className="space-y-6">

        {stats.statistics.map((item: any, index: number) => (
          <div
            key={index}
            className="p-6 border border-border rounded-xl bg-surface"
          >
            <h2 className="font-semibold mb-4">
              {item.question}
            </h2>

            {/* SINGLE CHOICE */}
            {item.type === "single_choice" && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(item.distribution).map(
                      ([name, value]) => ({
                        name,
                        value,
                      })
                    )}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {Object.keys(item.distribution).map((_, i) => (
                      <Cell
                        key={i}
                        fill={COLORS[i % COLORS.length]}
                      />
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
                    })
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
                <div className="flex gap-6 mb-4">
                  <span>
                    Moyenne: <b>{item.average}</b>
                  </span>
                  <span>
                    Médiane: <b>{item.median}</b>
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={Object.entries(item.distribution).map(
                      ([name, value]) => ({
                        name,
                        value,
                      })
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
              <div className="space-y-2">
                {item.responses?.map((r: string, i: number) => (
                  <div key={i} className="p-3 bg-bg rounded">
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}