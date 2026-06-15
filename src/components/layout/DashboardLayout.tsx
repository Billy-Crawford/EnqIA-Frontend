// src/components/layout/DashboardLayout.tsx

import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border p-4">
        <h1 className="text-lg font-bold text-primary mb-6">
          EnqIA
        </h1>

        <nav className="flex flex-col gap-3 text-sm">
          <a className="hover:text-primary" href="/dashboard">
            Dashboard
          </a>
          <a className="hover:text-primary" href="/surveys">
            Surveys
          </a>
          <a className="hover:text-primary" href="/users">
            Users
          </a>
          <a className="hover:text-primary" href="/logs">
            Logs
          </a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-surface">
          <span className="text-sm text-text-secondary">
            EnqIA Dashboard
          </span>

          <div className="text-sm text-primary">
            admin
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
