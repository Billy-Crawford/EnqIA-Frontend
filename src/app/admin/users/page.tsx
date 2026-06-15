"use client";

import { useEffect, useState } from "react";
import { usersService } from "@/services/users.service";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    usersService.getAll().then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-3">{u.id}</td>
                <td className="p-3">
                  {u.firstname} {u.lastname}
                </td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-primary">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


