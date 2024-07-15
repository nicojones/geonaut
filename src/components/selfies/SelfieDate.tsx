"use client";

import { useMemo, useState } from "react";
import { format } from "timeago.js";

import { formatDate } from "@/functions";

interface SelfieDateProps {
  icon: JSX.Element;
  date: Date | string;
  label?: string;
}

export const SelfieDate = ({ date, icon, label }: SelfieDateProps): JSX.Element => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const dateReadable = useMemo(() => {
    const parsed = new Date(date);
    return (
      isNaN(parsed.getTime())
        ? String(date)
        : formatDate(new Date(date))
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
            <span title={(label ? label + " " : "") + format(date)}>{dateReadable}</span>
          )
          : (
            <span title={(label ? label + " " : "") + dateReadable}>{format(date)}</span>
          )
      }
    </span>
  );
};
