"use client";
import { useEffect, useState } from "react";

import { selfieTextColor } from "@/functions";
import { ISelfie, ISelfieComment } from "@/types";

import { AddComment } from "./AddComment";
import { CommentItem } from "./CommentItem";
import { CommentPlaceholder } from "./CommentPlaceholder";
import { fetchComments } from "./fetch-comments.function";

interface CommentsProps {
  selfie: ISelfie;
}

export const CommentList = ({ selfie }: CommentsProps): JSX.Element => {
  const [comments, setComments] = useState<ISelfieComment[] | null>(null);

  useEffect(() => {
    fetchComments(selfie.hash)
      .then(c => setComments(c));
  }, [selfie.hash]);

  return (
    <div className="flex flex-col">
      <AddComment
        selfie={selfie}
      />
      {
        comments
          ? (
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
          )
          : (
            "Loading..."
          )
      }
    </div>
  );
};
