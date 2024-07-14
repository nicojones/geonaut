import { Avatar } from "@mui/joy";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

import { useNotificationsContext } from "@/context";
import { INotification } from "@/types";

import { NotificationComment, NotificationLike, NotificationPost } from "./types";

interface NotificationItemProps {
  notification: INotification;
}

export const NotificationItem = ({ notification: n }: NotificationItemProps): JSX.Element => {
  const { markAsRead, markAsUnead } = useNotificationsContext();
  const [read, setRead] = useState<boolean>(!!n.seen);

  const handleReadToggle = (): void => {
    if (read) {
      markAsUnead(n.id);
    } else {
      markAsRead(n.id);
    }
    setRead(_r => !_r);
  };

  return (
    <div
      className={classNames(
        "grid grid-cols-12 cursor-pointer hover:bg-slate-200 w-full py-1 relative",
        { "opacity-50 hover:opacity-100 transition-opacity": read },
      )}
      role="button"
      onClick={handleReadToggle}
    >
      <div className="fric col-span-2">
        <div className="h-full w-8 grid place-items-center">
          <span
            title={n.added_on}
            className="absolute top-1 right-1 cursor-help text-xs"
          >{n.added_on_words}
          </span>
          <div
            className={classNames(
              "rounded-full w-3 aspect-square border border-blue-600",
              { "bg-blue-600": !read },
            )}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Avatar src={(process.env.NEXT_PUBLIC_RESOURCE_URL as string) + n.avatar} />
          <Link href={`/u/${n.username}`} target="_blank" rel="noreferrer" className="text-secondary font-bold">
            @{n.username}
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-2 pl-6 col-span-10 justify-center">
        {
          n.notif_type === "comment" &&
          <NotificationComment notification={n} />
        }
        {
          n.notif_type === "like" &&
          <NotificationLike notification={n} />
        }
        {
          n.notif_type === "post" &&
          <NotificationPost notification={n} />
        }
      </div>
    </div>
  );
};
