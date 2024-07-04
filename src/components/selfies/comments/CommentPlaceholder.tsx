import classNames from "classnames";

import { ComponentChildren } from "@/types";

interface CommentPlaceholderProps {
  children: ComponentChildren;
  color: string;
  /**
   * @default false
   */
  hoverEffect?: boolean;
}

export const CommentPlaceholder = ({ children, color, hoverEffect = false }: CommentPlaceholderProps): JSX.Element =>
  <div className="comment-styles fric justify-center grow" style={{ color }}>
    <label
      className={classNames("opacity-25 p-10", { "hover:opacity-100": hoverEffect })}
    >
      {children}
    </label>
  </div>;
