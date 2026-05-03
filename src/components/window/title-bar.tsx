import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type TitleBarProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const TitleBar = ({ children, className, ...props }: TitleBarProps) => {
  return (
    <div
      className={cn(
        "w-full border-b border-border bg-background/50 py-4 flex justify-around items-center",
        className,
      )}
      style={{
        WebkitAppRegion: "drag",
      }}
      {...props}
    >
      {children}
    </div>
  );
};
