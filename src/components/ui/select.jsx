import * as React from "react";
import { cx } from "@/lib/utils";
import "@/assets/styles/components/Select.scss";

const Select = React.forwardRef(({ className, children, ...props }, ref) => (<select className={cx("select", className)} ref={ref} {...props}>
      {children}
    </select>));
Select.displayName = "Select";
export { Select };
