import { create } from "zustand";

export type UserRole =
  | "admin"
  | "researcher"
  | "respondent";

export interface User {
  id: number;
  firstname?: string;
  lastname?: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;

  hydrated: boolean;

  setAuth: (
    user: User,
    token: string
  ) => void;

  setHydrated: () => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  hydrated: false,

  setAuth: (user, token) =>
    set({
      user,
      accessToken: token,
    }),

  setHydrated: () =>
    set({
      hydrated: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));

