"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questionsService } from "@/services/questions.service";

export default function EditQuestionPage({
  params,
}: {
  params: { surveyId: string; questionId: string };
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    type: "",
  });

  const load = async () => {
    // OPTION: si tu ajoutes GET /questions/:id
    // const data = await questionsService.getById(Number(params.questionId));
    // setForm(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await questionsService.update(Number(params.questionId), form);
    router.push(`/admin/surveys/${params.surveyId}/questions`);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">
        Modifier question
      </h1>

      <input
        className="w-full p-3 border border-border bg-surface rounded"
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

      <button
        onClick={submit}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Sauvegarder
      </button>
    </div>
  );
}