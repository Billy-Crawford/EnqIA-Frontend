// src/app/admin/users/[id]/page.tsx
"use client";

import { usersService } from "@/services/users.service";
import { useEffect, useState } from "react";

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
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Détails utilisateur
      </h1>

      <div className="bg-surface border border-border rounded-xl p-6 space-y-4">

        <div>
          <p className="text-text-secondary">
            ID
          </p>
          <p>{user.id}</p>
        </div>

        <div>
          <p className="text-text-secondary">
            Prénom
          </p>
          <p>{user.firstname}</p>
        </div>

        <div>
          <p className="text-text-secondary">
            Nom
          </p>
          <p>{user.lastname}</p>
        </div>

        <div>
          <p className="text-text-secondary">
            Email
          </p>
          <p>{user.email}</p>
        </div>

        <div>
          <p className="text-text-secondary">
            Rôle
          </p>
          <p>{user.role}</p>
        </div>

      </div>
    </div>
  );
}
