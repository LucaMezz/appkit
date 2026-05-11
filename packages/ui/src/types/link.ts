import type { ComponentProps, ComponentType } from "react";

export type LinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export type Link = ComponentType<LinkProps>;
