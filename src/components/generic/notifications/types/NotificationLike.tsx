import Link from "next/link";

import { INotification } from "@/types";

interface NotificationLikeProps {
  notification: INotification;
}

export const NotificationLike = ({ notification: n }: NotificationLikeProps): JSX.Element => {
  return (
    <>
      <span className="text-sm">
        <Link
          href={`/u/${n.username}`}
          className="font-bold cursor-pointer hover:underline"
          onClick={e => e.stopPropagation()}
        >{n.name}
        </Link>
        &nbsp;
        liked your post
        &nbsp;
        <Link
          href={`/s/${n.active_hash}`}
          className="font-bold cursor-pointer hover:underline"
        >{n.title}
        </Link>
      </span>
    </>
  );
};
