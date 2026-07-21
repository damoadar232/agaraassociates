import { APP_LOGO, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
const sizes = {
    sm: { box: "h-8 w-8", image: 32 },
    md: { box: "h-9 w-9", image: 36 },
    lg: { box: "h-12 w-12", image: 48 },
    xl: { box: "h-16 w-16", image: 64 },
};
export function AppLogo({ size = "md", className, showName = false, tagline, variant = "default", }) {
    const { box, image } = sizes[size];
    return (<div className={cn("flex items-center gap-2.5 min-w-0", className)}>
      <div className={cn("relative shrink-0 overflow-hidden rounded-xl", box)}>
        <img src={APP_LOGO} alt={`${APP_NAME} logo`} width={image} height={image} className="h-full w-full object-cover"/>
      </div>
      {showName && (<div className="min-w-0">
          <p className={cn("font-semibold text-sm tracking-tight truncate", variant === "light" && "text-white")}>
            {APP_NAME}
          </p>
          {tagline && (<p className={cn("text-[10px] leading-tight truncate", variant === "light" ? "text-white/80" : "text-muted-foreground")}>
              {tagline}
            </p>)}
        </div>)}
    </div>);
}
