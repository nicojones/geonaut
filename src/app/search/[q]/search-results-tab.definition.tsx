import { CalendarIcon, MapPinIcon, PhotoIcon, UserIcon } from "@heroicons/react/16/solid";

import { ISearchResultType, IValueLabel } from "@/types";

export const SEARCH_TABS_MAP: Record<number, ISearchResultType> = {
  0: "selfie",
  1: "location",
  2: "date",
  3: "user",
} as const;

export const SEARCH_TABS: Array<IValueLabel<ISearchResultType, JSX.Element>> = [
  {
    value: "selfie",
    label: <PhotoIcon className="size-10" />,
  },
  {
    value: "location",
    label: <MapPinIcon className="size-10" />,
  },
  {
    value: "date",
    label: <CalendarIcon className="size-10" />,
  },
  {
    value: "user",
    label: <UserIcon className="size-10" />,
  },
];
