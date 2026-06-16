import { api } from "./api";

export const answersService = {
  getSurveyAnswers: async (surveyId: number) => {
    const res = await api.get(
      `/answers/survey/${surveyId}`
    );

    return res.data;
  },
};

