// src/services/questions.service.ts

import { api } from "./api";

export const questionsService = {
  create: async (surveyId: number, data: any) => {
    const res = await api.post(`/questions/survey/${surveyId}`, data);
    return res.data;
  },

  update: async (id: number, data: any) => {
    const res = await api.put(`/questions/${id}`, data);
    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(`/questions/${id}`);
    return res.data;
  },

  getBySurvey: async (surveyId: number) => {
    const res = await api.get(`/questions/survey/${surveyId}`);
    return res.data;
  },
};

