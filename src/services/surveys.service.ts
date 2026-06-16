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

  archive: async (id: number) => {
    const res = await api.patch(
      `/surveys/${id}/archive`
    );

    return res.data;
  },

  unarchive: async (id: number) => {
    const res = await api.patch(
      `/surveys/${id}/unarchive`
    );

    return res.data;
  },
};

