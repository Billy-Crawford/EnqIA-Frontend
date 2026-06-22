import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-primary text-white border-primary hover:bg-primary/90 hover:border-primary/90 focus:ring-primary shadow-lg shadow-primary/20",
    secondary:
      "bg-surface text-text-primary border-border hover:bg-surfaceHover hover:border-text-secondary/20 focus:ring-border",
    danger:
      "bg-danger text-white border-danger hover:bg-danger/90 hover:border-danger/90 focus:ring-danger shadow-lg shadow-danger/20",
    ghost:
      "bg-transparent text-text-primary border-transparent hover:bg-surface hover:border-border focus:ring-surface",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}

