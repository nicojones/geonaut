"use client";

import { useMemo, useState } from "react";

import { formatDate, parsedDate, timeAgo } from "@/functions";

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
  const dateReadable = useMemo(() => formatDate(parsedDate(date), isDate), [date]);

  return (
    <span
      className="fric space-x-3 cursor-pointer"
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
