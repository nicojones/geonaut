import { ArrowPathIcon, ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Input } from "@mui/joy";
import { ChangeEventHandler, useCallback, useState } from "react";

interface TEditSelfieRandomizeCoordsProps {
  onClick: (maxDistanceMeters: number) => void;
};

const RANDOM_DISTANCE = "_random_distance_";
const DEFAULT_DISTANCE = 100;

export const EditSelfieRandomizeCoords = ({ onClick }: TEditSelfieRandomizeCoordsProps): JSX.Element => {
  const [meters, setMeters] = useState<number>(Number(localStorage.getItem(RANDOM_DISTANCE) ?? DEFAULT_DISTANCE));
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => setIsActive(a => !a), []);
  const handleClick = useCallback(() => onClick(meters), [meters, onClick]);
  const handleReset = useCallback(() => onClick(0), [onClick]);
  const handleUpdateMeters: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    localStorage.setItem(RANDOM_DISTANCE, e.target.value);
    setMeters(Number(e.target.value ?? DEFAULT_DISTANCE));
  }, []);

  return (
    isActive
      ? (
        <div className="flex items-center gap-4">
          <Input startDecorator="randomize by" endDecorator="m" variant='plain' value={meters} onChange={handleUpdateMeters} className="text-xs w-44 border-0 outline-none" size="sm" />
          <ArrowPathIcon className="size-3 cursor-pointer" role="button" onClick={handleClick} title={`randomize ~${meters}m`} />
          <ArrowUturnLeftIcon className="size-3 cursor-pointer" role="button" onClick={handleReset} title="reset randomness" />
          <XMarkIcon className="size-3 cursor-pointer" role="button" onClick={toggleActive} title="cancel" />
        </div>
      )
      : (
        <a className="size-3 inline-block cursor-pointer" onClick={toggleActive} title="randomize coords">
          <ArrowPathIcon />
        </a>
      )
  );
};
