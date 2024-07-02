
import { selfieTextColor } from "@/functions";
import { serverFetch } from "@/functions/server";
import { ISelfie, ISelfieComment } from "@/types";

import { AddComment } from "./add-comment";
import { CommentItem } from "./comment-item";
import { CommentPlaceholder } from "./comment-placeholder";

interface CommentsProps {
  selfie: ISelfie;
}

const getComments = (hash: string): Promise<ISelfieComment[]> => {
  return serverFetch<{ comments: ISelfieComment[]; }, any>({
    url: "/ajax/comments/get",
    body: { selfie: hash },
  })
    .then(r => {
      const reversedComments = r.comments;
      reversedComments.reverse();
      return reversedComments;
    });
};

export const Comments = async ({ selfie }: CommentsProps): Promise<JSX.Element> => {
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
