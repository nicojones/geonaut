import Link from "next/link";

import { INotification } from "@/types";

interface NotificationTagAcceptProps {
  notification: INotification;
}

export const NotificationTagAccept = ({ notification: n }: NotificationTagAcceptProps): JSX.Element => {
  return (
    <span className="text-sm">
      <Link
        href={`/u/${n.username}`}
        className="font-bold cursor-pointer hover:underline"
        onClick={e => e.stopPropagation()}
      >{n.name}
      </Link>
      &nbsp;
      confirmed they&apos;re in
      &nbsp;
      <Link
        href={`/s/${n.active_hash}`}
        className="font-bold cursor-pointer hover:underline"
        onClick={e => e.stopPropagation()}
      >{n.title}
      </Link>
    </span>
  );
};
