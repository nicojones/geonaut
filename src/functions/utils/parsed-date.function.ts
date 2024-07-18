export const parsedDate = (date: string | Date): Date =>
  typeof date === "string" ? new Date(`${date.split(".")[0]}.000Z`) : date;
