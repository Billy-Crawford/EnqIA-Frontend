// src/services/answers.service.ts

import { api } from "./api";

export const answersService = {
  getSurveyAnswers: async (
    surveyId: number,
    query?: string
  ) => {
    const url = query
      ? `/answers/survey/${surveyId}?${query}`
      : `/answers/survey/${surveyId}`;

    const res = await api.get(url);

    return res.data;
  },

  submitAnswers: async (
    surveyId: number,
    answers: any[]
  ) => {
    const res = await api.post(
      `/answers/survey/${surveyId}`,
      {
        answers,
      }
    );

    return res.data;
  },

  getMyAnswers: async () => {
    const res = await api.get(
      "/answers/my"
    );

    return res.data;
  },
};


