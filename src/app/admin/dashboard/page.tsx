"use client";

import Card from "@/components/ui/Card";

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>Users: loading...</Card>
      <Card>Researchers: loading...</Card>
      <Card>Respondents: loading...</Card>
      <Card>Surveys: loading...</Card>
    </div>
  );
}
