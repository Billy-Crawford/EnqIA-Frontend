"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";

export default function CreateQuestionPage({
  params,
}: {
  params: { surveyId: string };
}) {
  const router = useRouter();
  const surveyId = Number(params.surveyId);

  const [form, setForm] = useState({
    title: "",
    type: "text",
    options: "",
  });

  const submit = async () => {
    await questionsService.create(surveyId, {
      title: form.title,
      type: form.type,
      options:
        form.type === "text"
          ? null
          : form.options.split(",").map((o) => o.trim()),
    });

    router.push(`/admin/surveys/${surveyId}/questions`);
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
