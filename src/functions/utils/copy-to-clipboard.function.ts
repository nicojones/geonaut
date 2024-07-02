import { toast } from "sonner";

export const copyToClipboard = (
  text: string,
  onCopy: (() => any) | undefined = undefined,
  showNotification: string | null,
): void => {
  navigator.clipboard.writeText(text).then(() => {
    if (showNotification) {
      toast(showNotification);
    }
    onCopy?.();
  });
};
