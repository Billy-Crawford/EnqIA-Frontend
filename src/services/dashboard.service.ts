import { api } from "./api";

export const dashboardService = {
  getAdminDashboard: async () => {
    const res = await api.get("/dashboard/admin");
    return res.data;
  },
};

