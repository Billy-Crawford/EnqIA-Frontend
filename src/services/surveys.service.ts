// src/services/surveys.service.ts

import { api } from "./api";

export const surveysService = {
  getAll: async () => {
    const res = await api.get("/surveys/");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/surveys/${id}`);
    return res.data;
  },

  create: async (data: {
    title: string;
    description: string;
  }) => {
    const res = await api.post("/surveys/", data);
    return res.data;
  },

  update: async (
    id: number,
    data: Partial<{
      title: string;
      description: string;
    }>
  ) => {
    const res = await api.put(
      `/surveys/${id}`,
      data
    );

    return res.data;
  },

  delete: async (id: number) => {
    const res = await api.delete(
      `/surveys/${id}`
    );

    return res.data;
  },

  publish: async (id: number) => {
    const res = await api.post(
      `/surveys/${id}/publish`
    );

    return res.data;
  },

  unpublish: async (id: number) => {
    const res = await api.post(
      `/surveys/${id}/unpublish`
    );

    return res.data;
  },

   exportCsv: async (surveyId: number) => {
    const res = await api.get(
      `/surveys/${surveyId}/export/csv`,
      {
        responseType: "blob",
      }
    );

    return res.data;
  },

  exportExcel: async (surveyId: number) => {
    const res = await api.get(
      `/surveys/${surveyId}/export/excel`,
      {
        responseType: "blob",
      }
    );

    return res.data;
  },

};

