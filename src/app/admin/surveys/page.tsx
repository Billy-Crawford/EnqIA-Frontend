// src/app/admin/surveys/page.tsx

"use client";

import { useEffect, useState } from "react";
import { surveysService } from "@/services/surveys.service";
import Link from "next/link";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await surveysService.getAll();
      setSurveys(data);
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Surveys</h1>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {surveys.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-3">{s.id}</td>

                <td className="p-3">
                  {s.title}
                </td>

                <td className="p-3">
                  <Link
                    href={`/admin/surveys/${s.id}`}
                    className="text-primary"
                  >
                    Ouvrir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}