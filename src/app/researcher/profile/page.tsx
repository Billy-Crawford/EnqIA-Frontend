// src/app/researcher/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

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

    alert("Profil mis à jour");
    load();
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mon profil chercheur</h1>

      {/* INFOS */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-2">
        <p>Email: {user.email}</p>
        <p>Rôle: {user.role}</p>
      </div>

      {/* FORM */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="p-3 border rounded bg-surface"
          placeholder="Prénom"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        />

        <input
          className="p-3 border rounded bg-surface"
          placeholder="Nom"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        />

        <select
          className="p-3 border rounded bg-surface"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          className="p-3 border rounded bg-surface"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
      </div>

      <button
        onClick={update}
        className="px-6 py-3 bg-primary text-white rounded-lg"
      >
        Mettre à jour
      </button>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Se déconnecter
      </button>
    </div>
  );
}
