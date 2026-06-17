// src/app/researcher/surveys/[surveyId]/questions/create/page.tsx

"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

import { questionsService } from "@/services/questions.service";

export default function CreateQuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId } = use(params);

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    type: "text",
  });

  const submit = async () => {
    await questionsService.create(
      Number(surveyId),
      form
    );

    router.push(
      `/researcher/surveys/${surveyId}/questions`
    );
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">
        Nouvelle question
      </h1>

      <input
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        placeholder="Titre"
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
        Créer
      </button>
    </div>
  );
}

