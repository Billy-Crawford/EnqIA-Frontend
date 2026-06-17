"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";

export default function RespondentProfilePage() {
  const [user, setUser] =
    useState<any>(null);

  const [form, setForm] =
    useState({
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
    });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data =
      await authService.getProfile();

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

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl">

      <div>
        <h1 className="text-3xl font-bold">
          Mon Profil
        </h1>

        <p className="text-text-secondary">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <p>
          <b>Email :</b> {user.email}
        </p>

        <p className="mt-2">
          <b>Rôle :</b> Répondant
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="p-3 border border-border rounded-lg"
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
          className="p-3 border border-border rounded-lg"
          placeholder="Nom"
          value={form.lastname}
          onChange={(e) =>
            setForm({
              ...form,
              lastname: e.target.value,
            })
          }
        />

        <select
          className="p-3 border border-border rounded-lg"
          value={form.gender}
          onChange={(e) =>
            setForm({
              ...form,
              gender: e.target.value,
            })
          }
        >
          <option value="">
            Sexe
          </option>

          <option value="male">
            Homme
          </option>

          <option value="female">
            Femme
          </option>
        </select>

        <input
          type="number"
          className="p-3 border border-border rounded-lg"
          placeholder="Âge"
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
        />

      </div>

      <button
        onClick={update}
        className="
          px-6
          py-3
          rounded-xl
          bg-primary
          text-white
        "
      >
        Enregistrer
      </button>

    </div>
  );
}

