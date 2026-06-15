// src/components/ui/Input.tsx

import { clsx } from "clsx";

type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-text-secondary">
          {label}
        </label>
      )}

      <input
        {...props}
        className={clsx(
          "px-3 py-2 rounded-lg bg-bg border text-text-primary outline-none",
          "focus:border-primary",
          error && "border-danger"
        )}
      />

      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
    </div>
  );
}

