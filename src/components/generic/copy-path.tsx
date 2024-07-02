"use client";

import { CopyToClipboard, ICopyToClipboardProps } from "./copy-to-clipboard";

type ICopyPathProps = Pick<ICopyToClipboardProps, "className" | "onCopy" | "withIcon" | "icon">;

export const CopyPath = (props: ICopyPathProps): JSX.Element => {
  return (
    <CopyToClipboard
      {...props}
      // text={window.location.href}
      copyValue={window.location.href}
      showNotification="URL copied! Share it anywhere"
    />
  );
};
