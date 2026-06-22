// src/app/(auth)/register/page.tsx

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
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] p-4 select-none">
      <div className="w-full max-w-[520px] p-8 rounded-2xl bg-[#111A2E] border border-[#24314D] shadow-2xl shadow-black/40 backdrop-blur-md">

        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#EAF0FF] tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-[#A9B4CC] mt-1">
            Inscription répondant EnqIA
          </p>
        </div>

        {/* Formulaire */}
        <div className="flex flex-col gap-4">

          {/* Grille Prénom / Nom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              placeholder="Jean"
              value={firstname}
              onChange={(e) =>
                setFirstname(e.target.value)
              }
            />

            <Input
              label="Nom"
              placeholder="Dupont"
              value={lastname}
              onChange={(e) =>
                setLastname(e.target.value)
              }
            />
          </div>

          <Input
            label="Adresse Email"
            type="email"
            placeholder="jean.dupont@exemple.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Input
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}

          {/* BOUTON ULTRA VISIBLE : Fond bleu vif standard, texte blanc pur */}
          <button
            type="button"
            className="w-full py-3 mt-2 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.99] text-center block text-sm"
            onClick={handleRegister}
          >
            Créer mon compte
          </button>

          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#24314D]/50"></div>
            </div>
          </div>

          <button
            type="button"
            className="text-[#A9B4CC] text-sm font-medium hover:text-[#EAF0FF] hover:underline transition-colors mt-2 text-center block w-full"
            onClick={() => router.push("/login")}
          >
            Déjà inscrit ? <span className="text-blue-400 font-semibold">Se connecter</span>
          </button>

        </div>
      </div>
    </div>
  );
}