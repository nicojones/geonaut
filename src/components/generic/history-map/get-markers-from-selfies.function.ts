import { selfiePin } from "@/functions";
import { IHistoricalMapPin, IMapDateRange, IMapPin } from "@/types";

export const getMarkersFromSelfies = (
  selfies: IHistoricalMapPin[],
  range: IMapDateRange,
  pinUrl?: "edit" | "view",
): IMapPin[] => {
  const markers: IMapPin[] = [];
  for (let i = 0, len = selfies.length; i < len; ++i) {
    const date = +new Date(selfies[i].selfie_date);
    if (date <= range[1] && date >= range[0]) {
      // It must be added
      markers.push(
        selfiePin(
          selfies[i], {
            url: pinUrl,
            lc: false,
          },
        ),
      );
    }
  }
  return markers;
};
