import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
export function FormField({ label, htmlFor, hint, required, children, className }) {
    return (<div className={cn("space-y-2", className)}>
      {label && (<Label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Label>)}
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>);
}
