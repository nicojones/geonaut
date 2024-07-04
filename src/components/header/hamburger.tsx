import "./hamburger.css";

import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

interface HamburgerMenuButtonProps {
  open: boolean;
  onClick: Dispatch<SetStateAction<void>>;
}

export const HamburgerMenuButton = ({ open, onClick }: HamburgerMenuButtonProps): JSX.Element => {
  return (
    <a
      role="button"
      id="main-menu-button"
      className={classNames("menu-button menu-button-lines", { open })}
      onClick={() => onClick()}
    >
      <hr />
      <hr />
      <hr />
    </a>
  );
};
