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
    <div className="space-y-6 select-none">
      {/* En-tête de page optimisé sans doublon visuel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#24314D]/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Utilisateurs
          </h1>
          <p className="text-sm text-[#A9B4CC] mt-1">
            Gérez les accès, les rôles et les comptes de la plateforme EnqIA.
          </p>
        </div>

        <Link
          href="/admin/users/new"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm active:scale-[0.98]"
        >
          + Ajouter un chercheur
        </Link>
      </div>

      {/* Conteneur de Tableau Premium */}
      <div className="bg-[#111A2E] border border-[#24314D] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#0E1626] border-b border-[#24314D] text-[#A9B4CC] text-xs font-bold uppercase tracking-wider">
                <th className="p-4 w-20 text-center">ID</th>
                <th className="p-4">Nom complet</th>
                <th className="p-4">Adresse Email</th>
                <th className="p-4 w-40">Rôle</th>
                <th className="p-4 w-48 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#24314D]/50 text-sm">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#A9B4CC]/60 font-medium">
                    Aucun utilisateur enregistré pour le moment.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#1A2742]/40 transition-colors group"
                  >
                    {/* ID */}
                    <td className="p-4 text-center font-mono font-bold text-[#A9B4CC]/70">
                      {user.id}
                    </td>

                    {/* Nom */}
                    <td className="p-4 font-semibold text-white">
                      {user.firstname} {user.lastname}
                    </td>

                    {/* Email */}
                    <td className="p-4 text-[#A9B4CC] font-medium">
                      {user.email}
                    </td>

                    {/* Rôle avec badge stylisé */}
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                        user.role?.toLowerCase() === 'admin' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                          : user.role?.toLowerCase() === 'researcher' || user.role?.toLowerCase() === 'chercheur'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {user.role || 'Répondant'}
                      </span>
                    </td>

                    {/* Actions ultra lisibles */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-90 group-hover:opacity-100">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/5 hover:bg-blue-500/10 px-2.5 py-1.5 rounded-lg border border-blue-500/10"
                        >
                          Voir
                        </Link>

                        <Link
                          href={`/admin/users/${user.id}/edit`}
                          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/5 hover:bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/10"
                        >
                          Modifier
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteUser(user.id)}
                          className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors bg-red-500/5 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-red-500/10"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}