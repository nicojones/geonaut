"use client";

import { FormControl, Slider } from "@mui/joy";
import classNames from "classnames";
import { useMemo, useState } from "react";

import { MapViewer } from "@/components/generic";
import { loadingMask } from "@/functions";
import { IDashboardMapSelfie, IMapDateRange } from "@/types";

import { getMarkersFromSelfies } from "./get-markers-from-selfies.function";
import { getRangeMarks } from "./get-range-marks.function";

interface HistoryMapProps {
  readonly range: IMapDateRange;
  readonly selfies: IDashboardMapSelfie[];
  /**
   * @optional
   */
  className?: string;
}

const MILLISECONDS_PER_WEEK = 86_400_000 * 7;
const MILLISECONDS_PER_YEAR = 52 * MILLISECONDS_PER_WEEK;
const GRADIENT_COLOR_FROM = "#8e44ad" as const;
const GRADIENT_COLOR_TO = "#27ae60" as const;

export const HistoryMap = ({ className = "", range, selfies }: HistoryMapProps): JSX.Element => {
  const [dateRange, setDateRange] = useState<IMapDateRange>([range[1] - MILLISECONDS_PER_YEAR, range[1]]);
  const [uiDateRange, setUiDateRange] = useState<IMapDateRange>(dateRange);
  const [loading, setLoading] = useState<boolean>(false);
  const markers = useMemo(() => getMarkersFromSelfies(selfies, dateRange), [dateRange]);
  const rangeMarks = useMemo(() => getRangeMarks(range), []);

  const handleDateRangeChange = (_event: Event, newRange: number | number[]): void => {
    setLoading(true);
    setUiDateRange(newRange as IMapDateRange);
  };

  const handleDateRangeCommited = (_event: any, newRange: number | number[]): void => {
    setDateRange(newRange as IMapDateRange);
    setLoading(false);
  };

  return (
    <div className="w-screen">
      <FormControl sx={{ height: 100 }}>
        <Slider
          min={range[0]}
          max={range[1]}
          step={MILLISECONDS_PER_WEEK}
          value={uiDateRange}
          onChange={handleDateRangeChange}
          onChangeCommitted={handleDateRangeCommited}
          valueLabelDisplay="auto"
          valueLabelFormat={v => (new Date(v).toDateString())}
          marks={rangeMarks}
          sx={{
            width: "90%",
            marginX: "auto",
            "--Slider-thumbSize": "24px",
            ".MuiSlider-track": {
              background: `linear-gradient(to right, ${GRADIENT_COLOR_FROM}, ${GRADIENT_COLOR_TO}) !important`,
            },
            ".MuiSlider-thumb": {
              "&::before": {
                borderColor: GRADIENT_COLOR_FROM + " !important",
                background: GRADIENT_COLOR_FROM,
              },
              "&:last-of-type::before": {
                borderColor: GRADIENT_COLOR_TO + " !important",
                background: GRADIENT_COLOR_TO,
              },
            },
          }}
        />
      </FormControl>
      <MapViewer
        className={classNames(
          "relative overflow-hidden",
          className,
          loadingMask({ loading, spinner: true }),
        )}
        markers={markers}
        style="satellite"
        changeStyleOnDragTo="satellite"
        connected
        lineColors={[GRADIENT_COLOR_FROM, GRADIENT_COLOR_TO]}
      />
    </div>
  );
};
