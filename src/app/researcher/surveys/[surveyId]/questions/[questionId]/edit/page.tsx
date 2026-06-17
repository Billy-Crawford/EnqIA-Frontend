// src/app/researcher/surveys/[surveyId]/questions/[questionId]/edit/page.tsx

"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { questionsService } from "@/services/questions.service";

export default function EditQuestionPage({
  params,
}: {
  params: Promise<{
    surveyId: string;
    questionId: string;
  }>;
}) {
  const {
    surveyId,
    questionId,
  } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    type: "text",
    options: [] as string[],
  });

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const questions =
        await questionsService.getBySurvey(
          Number(surveyId)
        );

      const question = questions.find(
        (q: any) =>
          q.id === Number(questionId)
      );

      if (!question) {
        alert("Question introuvable");
        return;
      }

      setForm({
        title: question.title,
        type: question.type,
        options: question.options || [],
      });
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    await questionsService.update(
      Number(questionId),
      form
    );

    router.push(
      `/researcher/surveys/${surveyId}/questions`
    );
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">
        Modifier question
      </h1>

      <input
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        className="w-full p-3 rounded-lg border border-border bg-surface"
      />

      <select
        value={form.type}
        onChange={(e) =>
          setForm({
            ...form,
            type: e.target.value,
          })
        }
        className="w-full p-3 rounded-lg border border-border bg-surface"
      >
        <option value="text">
          Texte
        </option>

        <option value="single_choice">
          Choix unique
        </option>

        <option value="multiple_choice">
          Choix multiple
        </option>

        <option value="likert">
          Likert
        </option>
      </select>

      <button
        onClick={submit}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Sauvegarder
      </button>
    </div>
  );
}
