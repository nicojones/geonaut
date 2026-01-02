"use client";

import { CopyToClipboard, ICopyToClipboardProps } from "./CopyToClipboard";

type ICopyPathProps = Pick<ICopyToClipboardProps, "className" | "onCopy" | "withIcon" | "icon">;

export const CopyPath = (props: ICopyPathProps): JSX.Element => {
  return typeof window === "undefined"
    ? <></>
    : (
      <CopyToClipboard
        {...props}
        // text={window.location.href}
        copyValue={window.location.href}
        showNotification="URL copied! Share it anywhere"
      />
    );
};
