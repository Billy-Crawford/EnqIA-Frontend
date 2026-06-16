"use client";

import { useEffect, useState } from "react";
import { logsService } from "@/services/logs.service";

interface Log {
  id: number;
  user_id: number;
  action: string;
  created_at: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logsService
      .getAll()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Journal des activités</h1>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Utilisateur</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-border">
                <td className="p-4">{log.id}</td>

                <td className="p-4">#{log.user_id}</td>

                <td className="p-4">{log.action}</td>

                <td className="p-4">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
