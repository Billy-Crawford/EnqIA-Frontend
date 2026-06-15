// src/components/ui/Card.tsx

import { clsx } from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-surface border border-border rounded-xl p-4",
        "hover:bg-surfaceHover transition",
        className
      )}
    >
      {children}
    </div>
  );
}
