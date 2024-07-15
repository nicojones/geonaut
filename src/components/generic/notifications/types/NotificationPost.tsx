import Image from "next/image";
import Link from "next/link";

import { selfieCpImage } from "@/functions";
import { INotification } from "@/types";

interface NotificationPostProps {
  notification: INotification;
}

export const NotificationPost = ({ notification: n }: NotificationPostProps): JSX.Element => {
  return (
    <div className="fric space-x-2">
      <Image width={100} height={150} src={selfieCpImage({ hash: n.hash })} alt={n.title} />
      <div className="flex flex-col justify-around">
        <span className="text-sm">
          <Link
            href={`/u/${n.username}`}
            className="font-bold cursor-pointer hover:underline"
          >{n.name}
          </Link>
          &nbsp;
          has uploaded a new post
        </span>
        <Link
          href={`/s/${n.active_hash}`}
          className="font-bold cursor-pointer hover:underline"
        >{n.title}
        </Link>
      </div>
    </div>
  );
};
