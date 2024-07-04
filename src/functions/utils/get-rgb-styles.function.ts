import { IRGB } from "@/types";

export const getRgbStyles = (color: IRGB | null): string => color ? `${color.r},${color.g},${color.b}` : "";
