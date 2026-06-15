const TOKEN_KEY = "enqia_token";
const USER_KEY = "enqia_user";

export const authStorage = {
  set(token: string, user: any) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  },

  getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    if (typeof window === "undefined") {
      return null;
    }

    const data = localStorage.getItem(USER_KEY);

    return data ? JSON.parse(data) : null;
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

