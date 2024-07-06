import { IMapDateMarker, IMapDateRange } from "@/types";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const SEASON_NAMES = ["Winter", "Spring", "Summer", "Fall"] as const;
const MILLISECONDS_IN_A_YEAR = 365 * 86_400_000;

const getSeasonLabel = (month: number): string => {
  if (month >= 2 && month <= 4) {
    return SEASON_NAMES[1];
  }
  if (month >= 5 && month <= 7) {
    return SEASON_NAMES[2];
  }
  if (month >= 8 && month <= 10) {
    return SEASON_NAMES[3];
  }
  return SEASON_NAMES[0];
};

export const getRangeMarks = (dateRange: IMapDateRange): IMapDateMarker[] => {
  const startDate = new Date(dateRange[0]);
  const endDate = new Date(dateRange[1]);

  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();

  const totalYears = (dateRange[1] - dateRange[0]) / MILLISECONDS_IN_A_YEAR;

  const markers: IMapDateMarker[] = [];

  if (totalYears >= 9) {
    for (let year = startYear; year <= endYear; year += 2) {
      const date = new Date(year, 0, 1);
      markers.push({
        value: date.getTime(),
        label: String(year),
      });
    }
  } else if (totalYears > 4) {
    for (let year = startYear; year <= endYear; year++) {
      const date = new Date(year, 0, 1);
      markers.push({
        value: date.getTime(),
        label: String(year),
      });
    }
  } else if (totalYears > 1.3) {
    for (let year = startYear; year <= endYear; year++) {
      for (let season = 0; season < 4; season++) {
        const seasonStartMonth = season * 3;
        if (year === startYear && seasonStartMonth < startMonth) {
          continue;
        };
        if (year === endYear && seasonStartMonth > endMonth) {
          break;
        };

        const date = new Date(year, seasonStartMonth, 1);
        markers.push({
          value: date.getTime(),
          label: `${getSeasonLabel(seasonStartMonth)} ${year}`,
        });
      }
    }
  } else {
    for (let year = startYear; year <= endYear; year++) {
      const start = year === startYear ? startMonth : 0;
      const end = year === endYear ? endMonth : 11;

      for (let month = start; month <= end; month++) {
        const date = new Date(year, month, 1);
        markers.push({
          value: date.getTime(),
          label: `${MONTH_NAMES[month]} ${year}`,
        });
      }
    }
  }

  return markers;
};
