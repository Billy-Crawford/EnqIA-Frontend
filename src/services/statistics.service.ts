// src/services/statistics.service.ts

import { api } from "./api";

export const statisticsService = {
  getSurveyStatistics: async (
    surveyId: number,
    filters?: {
      gender?: string;
      age_group?: string;
      date?: string;
    }
  ) => {
    const res = await api.get(
      `/surveys/${surveyId}/statistics`,
      {
        params: filters,
      }
    );

    return res.data;
  },
};

