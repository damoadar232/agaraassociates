import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-[#1F1F1F] text-white shadow-sm shadow-black/15 hover:shadow-md hover:shadow-black/18 hover:-translate-y-0.5",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-border/40 bg-transparent text-foreground hover:border-border hover:text-foreground hover:bg-white/40",
            secondary: "text-foreground hover:text-foreground/90 bg-transparent underline-offset-4 hover:underline",
            ghost: "text-foreground hover:bg-white/20",
            link: "text-[#B89A72] underline-offset-4 hover:underline",
        },
        size: {
            default: "h-11 px-5 py-2.5",
            sm: "h-9 rounded-full px-4 text-xs",
            lg: "h-12 rounded-full px-8 text-base",
            icon: "h-10 w-10 rounded-full",
        },
    },
    defaultVariants: { variant: "default", size: "default" },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}/>);
});
Button.displayName = "Button";
export { Button, buttonVariants };
