import { api } from "./api";

export const logsService = {
  getAll: async () => {
    const res = await api.get("/users/logs");
    return res.data;
  },
};

