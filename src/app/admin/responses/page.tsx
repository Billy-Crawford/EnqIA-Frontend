// src/app/admin/responses/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import { surveysService } from "@/services/surveys.service";
import { answersService } from "@/services/answers.service";

export default function ResponsesPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [surveyId, setSurveyId] = useState<number>();

  const [answers, setAnswers] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSurveys();
  }, []);

  useEffect(() => {
    if (surveyId) {
      loadAnswers();
    }
  }, [surveyId]);

  const loadSurveys = async () => {
    const data = await surveysService.getAll();

    setSurveys(data);

    if (data.length > 0) {
      setSurveyId(data[0].id);
    }
  };

  const loadAnswers = async () => {
    const data = await answersService.getSurveyAnswers(
      surveyId!
    );

    setAnswers(data);
  };

  const filteredAnswers = useMemo(() => {
    return answers.filter((answer) => {
      const text = JSON.stringify(answer).toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });
  }, [answers, search]);

  const uniqueRespondents = new Set(
    answers.map((a) => a.respondent_id)
  ).size;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Réponses
        </h1>

        <p className="text-text-secondary">
          Consultation des réponses
        </p>
      </div>

      {/* KPIs */}

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-text-secondary">
            Total réponses
          </p>

          <p className="text-3xl font-bold">
            {answers.length}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-text-secondary">
            Répondants uniques
          </p>

          <p className="text-3xl font-bold">
            {uniqueRespondents}
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-text-secondary">
            Questions répondues
          </p>

          <p className="text-3xl font-bold">
            {
              new Set(
                answers.map((a) => a.question_id)
              ).size
            }
          </p>
        </div>

      </div>

      {/* FILTRES */}

      <div className="grid md:grid-cols-2 gap-4">

        <select
          value={surveyId}
          onChange={(e) =>
            setSurveyId(
              Number(e.target.value)
            )
          }
          className="p-3 rounded-lg border border-border bg-surface"
        >
          {surveys.map((survey) => (
            <option
              key={survey.id}
              value={survey.id}
            >
              {survey.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Recherche..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="p-3 rounded-lg border border-border bg-surface"
        />

      </div>

      {/* TABLE */}

      <div className="bg-surface border border-border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-bg">

            <tr>
              <th className="p-3 text-left">
                Répondant
              </th>

              <th className="p-3 text-left">
                Question
              </th>

              <th className="p-3 text-left">
                Réponse
              </th>

              <th className="p-3 text-left">
                Date
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredAnswers.map((answer) => (

              <tr
                key={answer.answer_id}
                className="border-t border-border"
              >
                <td className="p-3">
                  <div>
                    <div className="font-medium">
                      {answer.respondent_name}
                    </div>

                    <div className="text-xs text-text-secondary">
                      {answer.respondent_email}
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  {answer.question}
                </td>

                <td className="p-3">

                  {answer.question_type ===
                  "multiple_choice"
                    ? answer.multiple_choices.join(
                        ", "
                      )
                    : answer.value}

                </td>

                <td className="p-3">
                  {new Date(
                    answer.created_at
                  ).toLocaleString()}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

