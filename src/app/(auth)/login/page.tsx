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
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-[420px] p-6 rounded-xl bg-surface border border-border">
        <h1 className="text-xl font-bold text-primary mb-6">Connexion EnqIA</h1>

        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={() => login(email, password)}>Se connecter</Button>

          <Link
            href="/register"
            className="text-primary text-sm hover:underline text-center"
          >
            Pas encore de compte ? S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
