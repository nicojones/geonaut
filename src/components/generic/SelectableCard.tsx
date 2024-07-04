import { Card } from "@mui/joy";
import classNames from "classnames";

import { ComponentChildren } from "@/types";

interface SelectableCardProps {
  className?: string;
  onClick: () => any;
  selected: boolean;
  children: ComponentChildren;
}

export const SelectableCard = ({ className = "", onClick, children, selected }: SelectableCardProps): JSX.Element => {
  return (
    <Card
      onClick={onClick}
      className={classNames("cursor-pointer hover:drop-shadow opacity-60 border-transparent", { "!border-gray-500 !opacity-100": selected }, className)}
    >
      {children}
    </Card>
  );
};
