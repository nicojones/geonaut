"use client";

import { FormControl, Slider } from "@mui/joy";
import classNames from "classnames";
import { useMemo, useState } from "react";

import { MapViewer } from "@/components/generic";
import { MS_PER_WEEK, MS_PER_YEAR, PIN_GRADIENT_COLOR_FROM, PIN_GRADIENT_COLOR_TO } from "@/config";
import { loadingMask } from "@/functions";
import { IHistoricalMapPin, IMapDateRange } from "@/types";

import { getMarkersFromSelfies } from "./get-markers-from-selfies.function";
import { getRangeMarks } from "./get-range-marks.function";

interface HistoryMapProps {
  readonly range: IMapDateRange;
  readonly selfies: IHistoricalMapPin[];
  /**
   * @optional
   */
  className?: string;
  /**
   * @optional
   * Setting this will cause the pin to be links.
   */
  pinUrl?: "edit" | "view";
}

export const HistoryMap = ({ className = "", range, selfies, pinUrl }: HistoryMapProps): JSX.Element => {
  const [dateRange, setDateRange] = useState<IMapDateRange>([Math.max(range[0], range[1] - MS_PER_YEAR), range[1]]);
  const [uiDateRange, setUiDateRange] = useState<IMapDateRange>(dateRange);
  const [loading, setLoading] = useState<boolean>(false);
  const markers = useMemo(() => getMarkersFromSelfies(selfies, dateRange, pinUrl), [dateRange, pinUrl]);
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
    <div className="w-full">
      <FormControl sx={{ height: 100, width: "100%" }}>
        <Slider
          min={range[0]}
          max={range[1]}
          step={MS_PER_WEEK}
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
              background: `linear-gradient(to right, ${PIN_GRADIENT_COLOR_FROM}, ${GRADIENT_COLOR_TO}) !important`,
            },
            ".MuiSlider-thumb": {
              "&::before": {
                borderColor: PIN_GRADIENT_COLOR_FROM + " !important",
                background: PIN_GRADIENT_COLOR_FROM,
              },
              "&:last-of-type::before": {
                borderColor: PIN_GRADIENT_COLOR_TO + " !important",
                background: PIN_GRADIENT_COLOR_TO,
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
        lineColors={[PIN_GRADIENT_COLOR_FROM, PIN_GRADIENT_COLOR_TO]}
        zoom={2}
        panZoom={2}
      />
    </div>
  );
};
