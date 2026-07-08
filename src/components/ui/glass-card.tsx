import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "subtle";
}

export function GlassCard({
  className,
  variant = "light",
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border backdrop-blur-xl transition-shadow",
        variant === "light" &&
          "bg-surface/65 border-border/50 shadow-glass",
        variant === "subtle" &&
          "bg-surface/45 border-border/35 shadow-glass-sm",
        variant === "dark" &&
          "bg-primary/92 border-border/15 shadow-glass-dark text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
