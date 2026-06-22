// src/app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] p-4 select-none">
      <div className="w-full max-w-[440px] p-8 rounded-2xl bg-[#111A2E] border border-[#24314D] shadow-2xl shadow-black/40 backdrop-blur-md">
        
        {/* En-tête */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            EnqIA Plateforme
          </div>
          <h1 className="text-2xl font-extrabold text-[#EAF0FF] tracking-tight">
            Connexion EnqIA
          </h1>
          <p className="text-sm text-[#A9B4CC] mt-1">
            Ravis de vous revoir. Connectez-vous à votre espace.
          </p>
        </div>

        {/* Formulaire */}
        <div className="flex flex-col gap-5">
          <Input
            label="Adresse Email"
            type="email"
            placeholder="exemple@domaine.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BOUTON ULTRA VISIBLE : Fond bleu vif standard, texte blanc pur */}
          <button 
            type="button"
            className="w-full py-3 mt-2 text-white font-bold bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.99] text-center block text-sm"
            onClick={() => login(email, password)}
          >
            Se connecter
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#24314D]/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#111A2E] px-2 text-[#A9B4CC]/60 font-medium">Nouveau ici ?</span>
            </div>
          </div>

          <Link
            href="/register"
            className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors text-center block hover:underline"
          >
            Pas encore de compte ? S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}