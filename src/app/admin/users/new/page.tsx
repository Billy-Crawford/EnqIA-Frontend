// src/app/admin/users/new/page.tsx
"use client";

import { useState } from "react";
import { usersService } from "@/services/users.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="max-w-2xl space-y-6 select-none">
      {/* En-tête */}
      <div className="flex flex-col gap-2 border-b border-[#24314D]/40 pb-6">
        <Link 
          href="/admin/users" 
          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 w-fit"
        >
          ← Annuler et retourner
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Nouveau chercheur
        </h1>
      </div>

      {/* Formulaire de création */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-8 space-y-5 shadow-xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Prénom</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Ex: Jean"
              value={form.firstname}
              onChange={(e) =>
                setForm({
                  ...form,
                  firstname: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Nom</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Ex: Dupont"
              value={form.lastname}
              onChange={(e) =>
                setForm({
                  ...form,
                  lastname: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Adresse Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            placeholder="jean.dupont@exemple.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Mot de passe d'initialisation</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={submit}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
          >
            Créer le compte chercheur
          </button>
        </div>
      </div>
    </div>
  );
}