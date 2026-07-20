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
        "rounded-[32px] border backdrop-blur-[28px] transition-shadow",
        variant === "light" &&
        "bg-white/18 border-white/28 shadow-glass",
        variant === "subtle" &&
        "bg-white/14 border-white/24 shadow-glass-sm",
        variant === "dark" &&
        "bg-black/70 border-white/15 shadow-glass-dark text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
