import { format, register } from "timeago.js";
import { LocaleFunc } from "timeago.js/lib/interface";

import { MS_PER_DAY } from "@/config";

import { parsedDate } from "./parsed-date.function";

const DATE_LOCALE = "date-locale" as const;
const dateAgoLocale: LocaleFunc = (number: number, index: number, totalSec: number = 0): [string, string] => {
  // if it was less than 24h ago, it could be "today".
  if (totalSec * 1000 < MS_PER_DAY) {
    const unixNow = +(new Date());
    if ((new Date().getDate()) === (new Date(unixNow - (totalSec ?? 0))).getDate()) {
      return ["today", "today"];
    }
  }
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  const relativeTimes: Array<[string, string]> = [
    ["today", "today"],
    ["today", "today"],
    ["today", "today"],
    ["today", "today"],
    ["recently", "today"],
    ["recently", "recently"],
    ["yesterday", "tomorrow"],
    ["%s days ago", "in %s days"],
    ["1 week ago", "in 1 week"],
    ["%s weeks ago", "in %s weeks"],
    ["1 month ago", "in 1 month"],
    ["%s months ago", "in %s months"],
    ["1 year ago", "in 1 year"],
    ["%s years ago", "in %s years"],
  ];

  return relativeTimes[index];
};

register(DATE_LOCALE, dateAgoLocale);

export const timeAgo = (date: string | Date, isDate: boolean = false): string => {
  return format(parsedDate(date), isDate ? DATE_LOCALE : undefined);
};
