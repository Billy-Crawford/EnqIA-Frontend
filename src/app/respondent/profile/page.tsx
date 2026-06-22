// src/app/respondent/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";

export default function RespondentProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
      await authService.updateProfile({
        firstname: form.firstname,
        lastname: form.lastname,
        gender: form.gender,
        age: Number(form.age),
      });
      alert("Profil mis à jour avec succès.");
      load();
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="font-mono text-xs text-[#A9B4CC] animate-pulse">Extraction des métadonnées du profil...</div>;
  }

  return (
    <div className="space-y-6 select-none max-w-3xl">
      {/* HEADER */}
      <div className="border-b border-[#24314D]/40 pb-5">
        <h1 className="text-3xl font-black text-white tracking-tight">Mon Profil</h1>
        <p className="text-sm text-[#A9B4CC] mt-1">Gérez vos critères démographiques requis pour l'indexation anonyme.</p>
      </div>

      {/* READONLY CREDENTIALS */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-5 space-y-2 shadow-xl">
        <div className="flex items-center gap-4 text-sm">
          <span className="w-20 font-mono text-xs text-[#A9B4CC]/60 uppercase tracking-wider">Identifiant</span>
          <span className="font-mono text-white text-xs">{user.email}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="w-20 font-mono text-xs text-[#A9B4CC]/60 uppercase tracking-wider">Rôle système</span>
          <span className="text-blue-400 font-bold text-xs uppercase tracking-wide bg-blue-500/10 border border-blue-500/10 px-2 py-0.5 rounded-md">Répondant</span>
        </div>
      </div>

      {/* INPUT FORM */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-xs font-bold uppercase tracking-wider text-white mb-2">Données Démographiques</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Prénom</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all"
              placeholder="Prénom"
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Nom</label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all"
              placeholder="Nom"
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Sexe / Genre</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all cursor-pointer"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Non spécifié</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#A9B4CC]">Âge révolu</label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl bg-[#0B1220] border border-[#24314D] text-white text-sm outline-none focus:border-blue-500 transition-all"
              placeholder="Âge"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="pt-4 border-t border-[#24314D]/40 flex justify-end">
          <button
            onClick={update}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all shadow-lg shadow-blue-600/10 active:scale-95"
          >
            {loading ? "Enregistrement..." : "Mettre à jour le profil"}
          </button>
        </div>
      </div>
    </div>
  );
}