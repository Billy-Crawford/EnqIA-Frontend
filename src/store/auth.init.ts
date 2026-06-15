import { authStorage } from "@/lib/auth-storage";
import { useAuthStore } from "./auth.store";

export const initAuth = () => {
  const token = authStorage.getToken();
  const user = authStorage.getUser();

  if (token && user) {
    useAuthStore.setState({
      accessToken: token,
      user,
      hydrated: true,
    });

    return;
  }

  useAuthStore.setState({
    hydrated: true,
  });
};
