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

  const [loading, setLoading] =
    useState(false);

  const submit = async () => {
    if (!form.title.trim()) {
      alert("Titre obligatoire");
      return;
    }

    try {
      setLoading(true);

      await surveysService.create(form);

      router.push(
        "/researcher/surveys"
      );
    } catch (error) {
      console.error(error);
      alert("Erreur création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">
        Nouvelle enquête
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Titre"
          className="w-full p-3 rounded-lg border border-border bg-surface"
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
          placeholder="Description"
          className="w-full p-3 rounded-lg border border-border bg-surface"
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
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-primary text-white"
        >
          {loading
            ? "Création..."
            : "Créer l'enquête"}
        </button>
      </div>
    </div>
  );
}

