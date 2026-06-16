// src/app/admin/users/[id]/edit/page.tsx
"use client";

import { usersService } from "@/services/users.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="max-w-xl">

      <h1 className="text-3xl font-bold mb-6">
        Modifier utilisateur
      </h1>

      <div className="space-y-4">

        <input
          value={user.firstname}
          onChange={(e) =>
            setUser({
              ...user,
              firstname: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-surface border border-border"
        />

        <input
          value={user.lastname}
          onChange={(e) =>
            setUser({
              ...user,
              lastname: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-surface border border-border"
        />

        <input
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-surface border border-border"
        />

        <select
          value={user.role}
          onChange={(e) =>
            setUser({
              ...user,
              role: e.target.value,
            })
          }
          className="w-full p-3 rounded-lg bg-surface border border-border"
        >
          <option value="admin">
            Admin
          </option>

          <option value="researcher">
            Researcher
          </option>

          <option value="respondent">
            Respondent
          </option>
        </select>

        <button
          onClick={submit}
          className="bg-primary px-5 py-3 rounded-lg text-white"
        >
          Enregistrer
        </button>

      </div>
    </div>
  );
}

