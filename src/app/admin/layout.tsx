import RouteGuard from "@/components/auth/RouteGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-bg text-text-primary flex">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-border p-4">
          <h1 className="text-primary font-bold text-lg mb-6">
            Admin Panel
          </h1>

          <nav className="flex flex-col gap-3 text-sm">
            <a href="/admin/dashboard" className="hover:text-primary">
              Dashboard
            </a>
            <a href="/admin/users" className="hover:text-primary">
              Users
            </a>
            <a href="/admin/surveys" className="hover:text-primary">
              Surveys
            </a>
            <a href="/admin/logs" className="hover:text-primary">
              Logs
            </a>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </RouteGuard>
  );
}

