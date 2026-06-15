import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { authStorage } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);

    setAuth(data.user, data.access_token);

    authStorage.set(data.access_token, data.user);

    // REDIRECTION PAR ROLE
    if (data.user.role === "admin") {
      router.push("/admin/dashboard");
    }

    if (data.user.role === "researcher") {
      router.push("/researcher/dashboard");
    }

    if (data.user.role === "respondent") {
      router.push("/app/dashboard");
    }
  };

  return { login };
};

