// src/app/admin/users/[id]/page.tsx
"use client";

import { usersService } from "@/services/users.service";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const data = await usersService.getById(Number(id));
      setUser(data);
    };

    load();
  }, [params]);

  if (!user) {
    return (
      <div className="space-y-6 animate-pulse max-w-3xl">
        <div className="h-8 bg-[#111A2E] rounded-md w-48"></div>
        <div className="h-64 bg-[#111A2E] border border-[#24314D] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6 select-none">
      {/* En-tête avec bouton retour */}
      <div className="flex flex-col gap-2 border-b border-[#24314D]/40 pb-6">
        <Link 
          href="/admin/users" 
          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 w-fit"
        >
          ← Retour à la liste
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          Détails utilisateur
        </h1>
      </div>

      {/* Fiche Profil Utilisateur */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-8 shadow-xl space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-b border-[#24314D]/40 pb-4 md:border-none md:pb-0">
            <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
              ID Utilisateur
            </p>
            <p className="text-sm font-mono font-bold text-blue-400 mt-1.5 bg-[#0B1220] border border-[#24314D] px-2.5 py-1 rounded-md w-fit">
              #{user.id}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
              Rôle Système
            </p>
            <div className="mt-1.5">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                user.role?.toLowerCase() === 'admin' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : user.role?.toLowerCase() === 'researcher' || user.role?.toLowerCase() === 'chercheur'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#24314D]/40 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
              Prénom
            </p>
            <p className="text-base text-white font-medium mt-1.5">{user.firstname}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
              Nom
            </p>
            <p className="text-base text-white font-medium mt-1.5">{user.lastname}</p>
          </div>
        </div>

        <div className="border-t border-[#24314D]/40 pt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">
            Adresse Email
          </p>
          <p className="text-base text-white font-medium mt-1.5 tracking-wide">{user.email}</p>
        </div>

      </div>
    </div>
  );
}

