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
};

