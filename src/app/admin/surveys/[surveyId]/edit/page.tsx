// src/app/admin/surveys/[surveyId]/edit/page.tsx

"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { surveysService } from "@/services/surveys.service";

export default function EditSurveyPage({
  params,
}: {
  params: Promise<{
    surveyId: string;
  }>;
}) {
  const { surveyId } = use(params);

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const load = async () => {
      const survey =
        await surveysService.getById(
          Number(surveyId)
        );

      setForm({
        title: survey.title,
        description:
          survey.description || "",
      });
    };

    load();
  }, [surveyId]);

  const submit = async () => {
    await surveysService.update(
      Number(surveyId),
      form
    );

    router.push("/admin/surveys");
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="text-3xl font-bold">
        Modifier enquête
      </h1>

      <input
        className="w-full p-3 rounded-lg bg-surface border border-border"
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
        Sauvegarder
      </button>
    </div>
  );
}


