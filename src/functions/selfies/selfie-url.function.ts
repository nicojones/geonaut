
export const selfieUrl = (activeHash: string, pin?: "edit" | "view"): string =>
  pin
    ? (
      pin === "edit"
        ? `/edit/${activeHash}`
        : `/s/${activeHash}`
    )
    : "#";
