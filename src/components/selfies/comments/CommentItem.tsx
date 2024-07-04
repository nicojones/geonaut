import { Avatar } from "@mui/joy";
import Link from "next/link";

import { selfieTextColor } from "@/functions";
import { ISelfie, ISelfieComment } from "@/types";

interface CommentItemProps {
  comment: ISelfieComment;
  selfie: ISelfie;
}

export const CommentItem = ({ comment, selfie }: CommentItemProps): JSX.Element => {
  const color = selfieTextColor(selfie);
  return (
    <div
      className={`bg-transparent text-[${color}] fric space-x-2 comment-styles`}
    >
      <div className="flex flex-col space-y-1">
        <Avatar
          src={`${process.env.NODE_PUBLIC_RESOURCE_URL as string}${comment.avatar}`}
          alt={`Avatar of ${comment.name}`}
          className="size-10"
        />
        <Link href={`/u/${comment.username}`} className="flex flex-col">
          <span>{comment.name}</span>
          <small>@{comment.username}</small>
        </Link>
      </div>
      <p className="p-3 relative fric grow h-full">
        {comment.comment}
        <small className="absolute -bottom-1 -right-1">at {comment.added_on}</small>
      </p>
    </div>
  );
};
