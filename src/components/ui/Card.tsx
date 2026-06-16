// src/components/ui/Card.tsx

import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-sm text-text-secondary">{title}</p>

      <h3 className="text-3xl font-bold mt-2 text-primary">{value}</h3>
    </div>
  );
}
