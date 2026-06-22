// src/components/ui/Input.tsx

import { clsx } from "clsx";

type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-text-secondary tracking-wide uppercase">
          {label}
        </label>
      )}

      <input
        {...props}
        className={clsx(
          "w-full px-4 py-3 rounded-xl bg-bg border text-text-primary text-sm transition-all duration-200 outline-none placeholder:text-text-secondary/40",
          error 
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20" 
            : "border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20"
        )}
      />

      {error && (
        <span className="text-xs font-medium text-danger mt-0.5 flex items-center gap-1">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}