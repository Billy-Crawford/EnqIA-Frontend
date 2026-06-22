// src/components/ui/Card.tsx

import { clsx } from "clsx";

type CardProps = {
  title: string;
  value: number | string;
  className?: string;
};

export default function Card({
  title,
  value,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-[#111A2E] border border-[#24314D] rounded-2xl p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:border-blue-500/40 hover:shadow-black/40 flex flex-col justify-between min-h-[120px]",
        className
      )}
    >
      {/* Titre : Gris clair chaud, parfaitement lisible et contrasté sur le fond bleu nuit */}
      <p className="text-xs font-bold tracking-wider uppercase text-[#A9B4CC]">
        {title}
      </p>

      {/* Valeur numérique ou textuelle : Blanc pur texturé, grand format pour sauter aux yeux */}
      <h3 className="text-3xl font-black mt-4 text-white tracking-tight font-mono">
        {value}
      </h3>
    </div>
  );
}