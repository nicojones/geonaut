"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

import { copyToClipboard, delay } from "@/functions";
import { IClassName, PDefault } from "@/types";

export interface ICopyToClipboardProps extends IClassName {
  /**
   * A label to show
   * @default undefined
   */
  text?: string | JSX.Element;
  /**
   * This function is called after the data has been copied (it's async!)
   */
  onCopy?: () => any;
  /**
   * Value to copy
   */
  copyValue: string;
  /**
   * Show a notification after the text has been copied.
   * @optional
   * @default null
   */
  showNotification?: string | null;
  /**
   * Show an icon next to it. By default is a ClipboardIcon. change {@link icon} for more customization
   * @optional
   * @default true
   */
  withIcon?: boolean;
  /**
   * @optional
   * @default ClipboardIcon
   */
  icon?: JSX.Element;
}

export const CopyToClipboard = ({
  showNotification = null,
  withIcon = true,
  ...props
}: ICopyToClipboardProps): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = (e: PDefault): void => {
    e.preventDefault();
    e.stopPropagation();

    copyToClipboard(
      props.copyValue,
      () => {
        props.onCopy?.();
        setCopied(true);
      },
      showNotification,
    );
  };

  useEffect(() => {
    if (copied) {
      const timeout = delay(() => setCopied(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <a
      href="#"
      className={"flex items-center space-x-2 " + (props.className ?? "")}
      role="button"
      aria-label="copy to clipboard"
      style={{ cursor: "pointer", textDecoration: "none" }}
      onClick={handleClick}
    >
      {
        withIcon &&
        (
          copied
            ? <CheckIcon className="size-4 text-green-500" />
            : (props.icon ?? <ClipboardIcon className="size-4 hover:text-blue-500" />)
        )
      }
      {
        props.text && <span>{props.text}</span>
      }
    </a>
  );
};
