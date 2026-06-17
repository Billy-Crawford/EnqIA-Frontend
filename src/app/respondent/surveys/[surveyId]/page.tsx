// src/app/respondent/surveys/[surveyId]/page.tsx

"use client";

import { use } from "react";
import { useEffect, useState } from "react";

import { surveysService } from "@/services/surveys.service";
import { answersService } from "@/services/answers.service";

export default function RespondSurveyPage({
  params,
}: {
  params: Promise<{
    surveyId: string;
  }>;
}) {
  const { surveyId } = use(params);

  const [survey, setSurvey] = useState<any>(null);

  const [answers, setAnswers] = useState<Record<number, any>>({});

  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const [surveyData, participations] = await Promise.all([
        surveysService.getById(Number(surveyId)),
        surveysService.getMyParticipations(),
      ]);

      setSurvey(surveyData);

      const exists = participations.some(
        (p: any) => p.survey_id === Number(surveyId),
      );

      setAlreadyAnswered(exists);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAnswers({});
  };

  const submit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      const payload = Object.entries(answers).map(([questionId, value]) => ({
        question_id: Number(questionId),
        value,
      }));

      await answersService.submitAnswers(Number(surveyId), payload);

      // 🔥 IMPORTANT: reset + refresh état backend
      resetForm();
      await load();

      alert("Réponses envoyées avec succès");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!survey) {
    return <div>Survey introuvable</div>;
  }

  if (alreadyAnswered) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-green-50 border border-green-300 rounded-xl p-8">
          <h1 className="text-2xl font-bold">Participation enregistrée</h1>

          <p className="mt-3">Vous avez déjà répondu à cette enquête.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{survey.title}</h1>

        <p className="text-text-secondary mt-2">{survey.description}</p>
      </div>

      {survey.questions.map((question: any) => (
        <div
          key={question.id}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <h2 className="font-semibold mb-4">{question.title}</h2>

          {/* SINGLE CHOICE */}
          {question.type === "single_choice" && (
            <div className="space-y-3">
              {question.options?.map((option: string) => (
                <label key={option} className="flex gap-3">
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    value={option}
                    onChange={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: option,
                      }))
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* MULTIPLE CHOICE */}
          {question.type === "multiple_choice" && (
            <div className="space-y-3">
              {question.options?.map((option: string) => (
                <label key={option} className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={(answers[question.id] || []).includes(option)}
                    onChange={(e) => {
                      const current = answers[question.id] || [];

                      if (e.target.checked) {
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: [...current, option],
                        }));
                      } else {
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: current.filter(
                            (x: string) => x !== option,
                          ),
                        }));
                      }
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {/* LIKERT */}
          {question.type === "likert" && (
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: value,
                    }))
                  }
                  className={`
                    p-3 rounded-lg border
                    ${
                      answers[question.id] === value
                        ? "bg-primary text-white"
                        : ""
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>
          )}

          {/* TEXT */}
          {question.type === "text" && (
            <textarea
              rows={4}
              value={answers[question.id] || ""}
              placeholder="Tapez votre réponse..."
              className="
                w-full
                p-3
                rounded-lg
                border border-border
                bg-surface
                text-text-primary
                placeholder-text-secondary
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [question.id]: e.target.value,
                }))
              }
            />
          )}
        </div>
      ))}

      <button
        onClick={submit}
        disabled={submitting}
        className="
          w-full
          py-4
          rounded-xl
          bg-primary
          text-white
          font-semibold
          disabled:opacity-60
        "
      >
        {submitting ? "Envoi..." : "Soumettre mes réponses"}
      </button>
    </div>
  );
}
