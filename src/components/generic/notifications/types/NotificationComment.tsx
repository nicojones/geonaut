import Link from "next/link";

import { INotification } from "@/types";

interface NotificationCommentProps {
  notification: INotification;
}

export const NotificationComment = ({ notification: n }: NotificationCommentProps): JSX.Element => {
  return (
    <>
      <span className="text-secondary">
        <Link
          href={`/u/${n.username}`}
          className="font-bold cursor-pointer hover:underline"
        >{n.name}
        </Link>
        &nbsp;
        commented on your post
        &nbsp;
        <Link
          href={`/s/${n.active_hash}`}
          className="font-bold cursor-pointer hover:underline"
        >{n.title}
        </Link>
      </span>
      <p>{n.comment}</p>
    </>
  );
};
