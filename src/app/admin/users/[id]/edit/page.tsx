// src/app/admin/users/[id]/edit/page.tsx
"use client";

import { usersService } from "@/services/users.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [user, setUser] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const load = async () => {
      const { id } = await params;

      const data = await usersService.getById(
        Number(id)
      );

      setUser(data);
    };

    load();
  }, [params]);

  const submit = async () => {
    const { id } = await params;

    await usersService.update(
      Number(id),
      user
    );

    router.push("/admin/users");
  };

  return (
    <div className="max-w-xl space-y-6 select-none">
      {/* En-tête */}
      <div className="flex flex-col gap-2 border-b border-[#24314D]/40 pb-6">
        <Link 
          href="/admin/users" 
          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 w-fit"
        >
          ← Annuler et retourner
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Modifier utilisateur
        </h1>
      </div>

      {/* Formulaire d'édition */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-5 shadow-xl">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Prénom</label>
          <input
            type="text"
            value={user.firstname}
            onChange={(e) =>
              setUser({
                ...user,
                firstname: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Nom</label>
          <input
            type="text"
            value={user.lastname}
            onChange={(e) =>
              setUser({
                ...user,
                lastname: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Adresse Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Rôle affecté</label>
          <select
            value={user.role}
            onChange={(e) =>
              setUser({
                ...user,
                role: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="researcher">Researcher</option>
            <option value="respondent">Respondent</option>
          </select>
        </div>

        <button
          type="button"
          onClick={submit}
          className="w-full sm:w-auto px-6 py-3 mt-2 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
        >
          Enregistrer les modifications
        </button>

      </div>
    </div>
  );
}


