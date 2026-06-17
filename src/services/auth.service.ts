import { api } from "./api";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    return res.data;
  },

  register: async (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post("/auth/register", {
      ...data,
      role: "respondent",
    });

    return res.data;
  },

  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res.data;
  },

  updateProfile: async (data: any) => {
    const res = await api.put("/auth/profile", data);
    return res.data;
  },
};
