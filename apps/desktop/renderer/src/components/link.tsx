import type { LinkProps } from "@appkit/ui";
import { Link as RouterLink } from "react-router-dom";

export function DesktopLink({ href, ...props }: LinkProps) {
  return <RouterLink to={href} {...props} />;
}
