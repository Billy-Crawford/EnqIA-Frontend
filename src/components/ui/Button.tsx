import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition border text-sm";

  const variants = {
    primary:
      "bg-primary text-white border-primary hover:opacity-90",
    secondary:
      "bg-surface text-text-primary border-border hover:bg-surfaceHover",
    danger:
      "bg-danger text-white border-danger hover:opacity-90",
    ghost:
      "bg-transparent text-text-primary border-transparent hover:bg-surface",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}

