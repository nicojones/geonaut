import { TZ_OFFSET } from "@/config";

export const parsedDate = (date: string | Date): Date => {
  let _parsedDate: string | Date = date;
  if (typeof date === "string") {
    _parsedDate = new Date(+new Date(date) - TZ_OFFSET);
  }
  if (isNaN(_parsedDate as any)) {
    _parsedDate = new Date(date);
  }
  if (isNaN(_parsedDate as any)) {
    throw new Error(`Invalid date! "${String(date)}"`);
  }
  return _parsedDate as Date;
};
