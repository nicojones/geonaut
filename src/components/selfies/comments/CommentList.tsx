
import { selfieTextColor } from "@/functions";
import { serverFetch } from "@/functions/server/server-fetch.function";
import { ISelfie, ISelfieComment } from "@/types";

import { AddComment } from "./AddComment";
import { CommentItem } from "./CommentItem";
import { CommentPlaceholder } from "./CommentPlaceholder";

interface CommentsProps {
  selfie: ISelfie;
}

const getComments = (hash: string): Promise<ISelfieComment[]> => {
  return serverFetch<{ comments: ISelfieComment[]; }, any>({
    url: "/api/comments/get",
    body: { selfie: hash },
    cacheTags: ["comments", hash],
  })
    .then(r => {
      const reversedComments = r.comments;
      reversedComments.reverse();
      return reversedComments;
    });
};

export const CommentList = async ({ selfie }: CommentsProps): Promise<JSX.Element> => {
  const comments = await getComments(selfie.hash);

  return (
    <div className="flex flex-col">
      <AddComment
        selfie={selfie}
      />
      {
        comments.length
          ? comments.map(c => <CommentItem key={c.id} comment={c} selfie={selfie} />)
          : (
            <CommentPlaceholder
              color={selfieTextColor(selfie)}
              hoverEffect={false}
            >
              No comments yet. Be the first
            </CommentPlaceholder>
          )
      }
    </div>
  );
};
