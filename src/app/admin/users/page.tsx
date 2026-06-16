"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usersService } from "@/services/users.service";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await usersService.getAll();
    setUsers(data);
  };

  const deleteUser = async (id: number) => {
    const confirmed = confirm(
      "Supprimer cet utilisateur ?"
    );

    if (!confirmed) return;

    await usersService.delete(id);

    loadUsers();
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Utilisateurs
  </h1>

  <Link
    href="/admin/users/new"
    className="px-4 py-2 rounded-lg bg-primary text-white"
  >
    Nouveau chercheur
  </Link>
</div>

        <Link
          href="/admin/users/new"
          className="bg-primary px-4 py-2 rounded-lg text-white"
        >
          + Ajouter un chercheur
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Rôle</th>
              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-border"
              >
                <td className="p-4">
                  {user.id}
                </td>

                <td className="p-4">
                  {user.firstname} {user.lastname}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  <div className="flex gap-3">

                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-400"
                    >
                      Voir
                    </Link>

                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-yellow-400"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
                      className="text-red-400"
                    >
                      Supprimer
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}