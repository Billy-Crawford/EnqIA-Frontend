"use client";

import { useState } from "react";
import { usersService } from "@/services/users.service";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "researcher",
  });

  const submit = async () => {
    await usersService.create(form);

    alert("Utilisateur créé");

    router.push("/admin/users");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Nouveau chercheur</h1>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
        <input
          className="w-full p-3 rounded-lg bg-bg border border-border"
          placeholder="Prénom"
          value={form.firstname}
          onChange={(e) =>
            setForm({
              ...form,
              firstname: e.target.value,
            })
          }
        />

        <input
          className="w-full p-3 rounded-lg bg-bg border border-border"
          placeholder="Nom"
          value={form.lastname}
          onChange={(e) =>
            setForm({
              ...form,
              lastname: e.target.value,
            })
          }
        />

        <input
          className="w-full p-3 rounded-lg bg-bg border border-border"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          className="w-full p-3 rounded-lg bg-bg border border-border"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={submit}
          className="px-4 py-3 rounded-lg bg-primary text-white"
        >
          Créer le compte
        </button>
      </div>
    </div>
  );
}
