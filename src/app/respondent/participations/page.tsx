// src/app/respondent/participations/page.tsx

"use client";

import { useEffect, useState } from "react";

import { surveysService }
from "@/services/surveys.service";

export default function ParticipationsPage() {
  const [items, setItems] =
    useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data =
      await surveysService.getMyParticipations();

    setItems(data);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Mes participations
      </h1>

      {items.map((item) => (
        <div
          key={item.survey_id}
          className="
            bg-surface
            border border-border
            rounded-xl
            p-5
          "
        >
          <h2 className="font-semibold">
            {item.title}
          </h2>

          <p className="text-sm text-text-secondary mt-2">
            Répondu le{" "}
            {new Date(
              item.answered_at
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

