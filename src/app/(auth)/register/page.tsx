"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const router = useRouter();

  const registerMutation = useRegister();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError(
        "Les mots de passe ne correspondent pas"
      );
      return;
    }

    try {
      await registerMutation.mutateAsync({
        firstname,
        lastname,
        email,
        password,
      });

      router.push("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Une erreur est survenue"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-[500px] p-6 rounded-xl bg-surface border border-border">

        <h1 className="text-2xl font-bold text-primary mb-2">
          Créer un compte
        </h1>

        <p className="text-sm text-muted mb-6">
          Inscription répondant EnqIA
        </p>

        <div className="flex flex-col gap-4">

          <Input
            label="Prénom"
            value={firstname}
            onChange={(e) =>
              setFirstname(e.target.value)
            }
          />

          <Input
            label="Nom"
            value={lastname}
            onChange={(e) =>
              setLastname(e.target.value)
            }
          />

          <Input
            label="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleRegister}
          >
            Créer mon compte
          </Button>

          <button
            className="text-primary text-sm hover:underline"
            onClick={() => router.push("/login")}
          >
            Déjà inscrit ? Se connecter
          </button>

        </div>
      </div>
    </div>
  );
}

