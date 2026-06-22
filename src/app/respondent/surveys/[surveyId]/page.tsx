// src/app/respondent/surveys/[surveyId]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import { surveysService } from "@/services/surveys.service";
import { answersService } from "@/services/answers.service";

export default function RespondSurveyPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
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
      const exists = participations.some((p: any) => p.survey_id === Number(surveyId));
      setAlreadyAnswered(exists);
    } finally {
      setLoading(false);
    }
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
      setAnswers({});
      await load();
      alert("Feuille d'enquête transmise avec succès.");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Erreur de transmission.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Génération du formulaire dynamique...</div>;
  }

  if (!survey) {
    return <div className="font-mono text-xs text-red-400">Structure de l'enquête introuvable.</div>;
  }

  if (alreadyAnswered) {
    return (
      <div className="max-w-2xl mx-auto py-12 select-none">
        <div className="bg-[#111A2E] border border-emerald-500/30 rounded-2xl p-8 text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mx-auto text-lg">✓</div>
          <h1 className="text-xl font-black text-white tracking-tight">Participation déjà enregistrée</h1>
          <p className="text-sm text-[#A9B4CC] max-w-sm mx-auto">Vos données de réponse pour ce module ont déjà été scellées et indexées.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 select-none">
      {/* HEADER SURVEY INFO */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">{survey.title}</h1>
        <p className="text-sm text-[#A9B4CC] mt-2 leading-relaxed">{survey.description}</p>
      </div>

      {/* RENDER QUESTIONS */}
      <div className="space-y-4">
        {survey.questions.map((question: any, index: number) => (
          <div key={question.id} className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white flex items-start gap-2">
              <span className="font-mono text-xs text-blue-500 bg-blue-500/10 border border-blue-500/10 px-2 py-0.5 rounded">Q{index + 1}</span>
              {question.title}
            </h2>

            {/* SINGLE CHOICE */}
            {question.type === "single_choice" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {question.options?.map((option: string) => {
                  const isChecked = answers[question.id] === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                        isChecked ? "bg-blue-600/10 border-blue-500 text-white font-bold" : "bg-[#0B1220] border-[#24314D] text-[#A9B4CC] hover:text-white hover:border-[#24314D]*2"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${question.id}`}
                        value={option}
                        checked={isChecked}
                        onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* MULTIPLE CHOICE */}
            {question.type === "multiple_choice" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {question.options?.map((option: string) => {
                  const current = answers[question.id] || [];
                  const isChecked = current.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                        isChecked ? "bg-blue-600/10 border-blue-500 text-white font-bold" : "bg-[#0B1220] border-[#24314D] text-[#A9B4CC] hover:text-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAnswers((prev) => ({ ...prev, [question.id]: [...current, option] }));
                          } else {
                            setAnswers((prev) => ({ ...prev, [question.id]: current.filter((x: string) => x !== option) }));
                          }
                        }}
                        className="accent-blue-500 h-4 w-4 rounded"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* LIKERT SCALE */}
            {question.type === "likert" && (
              <div className="grid grid-cols-5 gap-2 pt-2">
                {[1, 2, 3, 4, 5].map((value) => {
                  const isSelected = answers[question.id] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
                      className={`py-3 rounded-xl font-mono text-sm font-bold border transition-all ${
                        isSelected
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20 scale-95"
                          : "bg-[#0B1220] border-[#24314D] text-[#A9B4CC] hover:text-white hover:border-[#3b4f7c]"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}

            {/* OPEN TEXT */}
            {question.type === "text" && (
              <textarea
                rows={3}
                value={answers[question.id] || ""}
                placeholder="Saisissez votre réponse textuelle ici..."
                className="w-full p-4 rounded-xl bg-[#0B1220] border border-[#24314D] text-white placeholder-[#A9B4CC]/40 text-sm outline-none focus:border-blue-500 transition-all resize-none"
                onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>

      {/* FINAL SUBMISSION ACTION BUTTON */}
      <div className="pt-4">
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-[#111A2E] disabled:border border-[#24314D] text-white disabled:text-[#A9B4CC]/40 transition-all shadow-xl shadow-blue-600/10 active:scale-[0.99]"
        >
          {submitting ? "Cryptage et transmission de la feuille..." : "Soumettre mes réponses de façon sécurisée"}
        </button>
      </div>
    </div>
  );
}