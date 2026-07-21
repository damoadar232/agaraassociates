import * as React from "react";
import { cx } from "@/lib/utils";
import "@/assets/styles/components/Badge.scss";

function badgeVariants({ variant = "default", className } = {}) {
    return cx("badge", `badge--${variant}`, className);
}

function Badge({ className, variant, ...props }) {
    return <div className={badgeVariants({ variant, className })} {...props}/>;
}
export { Badge, badgeVariants };
