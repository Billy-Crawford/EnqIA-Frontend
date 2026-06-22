// src/app/researcher/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";

export default function ResearcherProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await authService.getProfile();
    setUser(data);
    setForm({
      firstname: data.firstname || "",
      lastname: data.lastname || "",
      gender: data.gender || "",
      age: data.age || "",
    });
  };

  const update = async () => {
    await authService.updateProfile({
      firstname: form.firstname,
      lastname: form.lastname,
      gender: form.gender,
      age: Number(form.age),
    });
    alert("Profil chercheur mis à jour avec succès.");
    load();
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-[#111A2E] rounded-md" />
        <div className="h-32 bg-[#111A2E] border border-[#24314D] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6 select-none">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Mon profil chercheur</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Gérez vos métadonnées d'identification académique.</p>
      </div>

      {/* AUDIT INFOS CARD */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 space-y-2 text-sm shadow-md">
        <div className="flex justify-between items-center py-1 border-b border-[#24314D]/40">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Adresse électronique</span>
          <span className="font-mono text-white">{user.email}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC]">Rôle attribué</span>
          <span className="text-xs font-bold font-mono tracking-wide uppercase bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded">
            {user.role}
          </span>
        </div>
      </div>

      {/* INPUT FORM GRID */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#A9B4CC] border-b border-[#24314D]/40 pb-2">Informations personnelles</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Prénom</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Votre prénom"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Nom de famille</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="Votre nom"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Genre</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Non spécifié</option>
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Âge révolu</label>
            <input
              type="number"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              placeholder="Âge"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#24314D]/40">
          <button
            type="button"
            onClick={update}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all text-xs active:scale-95 shadow-md shadow-blue-600/10"
          >
            Mettre à jour le profil
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 border border-red-500/30 transition-all text-xs active:scale-95 shadow-md shadow-red-600/10"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}