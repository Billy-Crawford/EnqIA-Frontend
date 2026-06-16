// src/app/admin/surveys/create/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { surveysService } from "@/services/surveys.service";

export default function CreateSurveyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const submit = async () => {
    await surveysService.create(form);

    router.push("/admin/surveys");
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="text-3xl font-bold">
        Nouvelle enquête
      </h1>

      <input
        className="w-full p-3 rounded-lg bg-surface border border-border"
        placeholder="Titre"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <textarea
        rows={6}
        className="w-full p-3 rounded-lg bg-surface border border-border"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <button
        onClick={submit}
        className="px-5 py-3 rounded-lg bg-primary text-white"
      >
        Créer l'enquête
      </button>
    </div>
  );
}
