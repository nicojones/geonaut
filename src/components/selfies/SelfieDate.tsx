"use client";

import { useMemo, useState } from "react";

import { formatDate, timeAgo } from "@/functions";

interface SelfieDateProps {
  icon: JSX.Element;
  date: string;
  label?: string;
  /**
   * Dates (as opposed to Datetimes) are less exact
   * @default false
   */
  readonly isDate?: boolean;
}

export const SelfieDate = ({ date, icon, isDate = false, label }: SelfieDateProps): JSX.Element => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const dateReadable = useMemo(() => {
    const parsed = new Date(date);
    return (
      isNaN(parsed.getTime())
        ? String(date)
        : formatDate(parsed, isDate)
    );
  }, [date]);

  return (
    <span
      className="fric space-x-2 cursor-pointer"
      role="button"
      onClick={() => setShowDate(_d => !_d)}
    >
      {icon}
      {
        showDate
          ? (
            <span title={(label ? label + " " : "") + timeAgo(date, isDate)}>{dateReadable}</span>
          )
          : (
            <span title={(label ? label + " " : "") + dateReadable}>{timeAgo(date, isDate)}</span>
          )
      }
    </span>
  );
};
