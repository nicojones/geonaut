import { ReactNode } from "react";

export type ComponentChildren = JSX.Element | string | number | false | "" | null | undefined | ReactNode | ComponentChildren[];
