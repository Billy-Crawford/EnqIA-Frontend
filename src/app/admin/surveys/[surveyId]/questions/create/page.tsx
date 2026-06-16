// src/app/admin/surveys/[surveyId]/questions/create/page.tsx

"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";

export default function CreateQuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const router = useRouter();

  // ✅ FIX NEXT 16 PROPRE
  const { surveyId } = use(params);
  const id = Number(surveyId);

  const [form, setForm] = useState({
    title: "",
    type: "text",
    options: "",
  });

  // 🔒 sécurité anti NaN (IMPORTANT)
  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      console.error("Invalid surveyId:", surveyId);
    }
  }, [id, surveyId]);

  const submit = async () => {
    if (!id || Number.isNaN(id)) return;

    await questionsService.create(id, {
      title: form.title,
      type: form.type,
      options:
        form.type === "text"
          ? null
          : form.options.split(",").map((o) => o.trim()),
    });

    router.push(`/admin/surveys/${id}/questions`);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Créer une question</h1>

      <input
        className="w-full p-3 border border-border bg-surface rounded"
        placeholder="Titre"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <select
        className="w-full p-3 border border-border bg-surface rounded"
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option value="text">Text</option>
        <option value="single_choice">Single choice</option>
        <option value="multiple_choice">Multiple choice</option>
        <option value="likert">Likert</option>
      </select>

      {form.type !== "text" && (
        <input
          className="w-full p-3 border border-border bg-surface rounded"
          placeholder="Options séparées par virgule"
          value={form.options}
          onChange={(e) =>
            setForm({ ...form, options: e.target.value })
          }
        />
      )}

      <button
        onClick={submit}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Créer
      </button>
    </div>
  );
}