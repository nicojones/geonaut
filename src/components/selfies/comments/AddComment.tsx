"use client";
import { Button, FormControl, Input } from "@mui/joy";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
import { raiseOnError, selfieTextColor } from "@/functions";
import { ISelfie, ISelfieComment, IUserSettings, PDefault } from "@/types";

import { CommentItem } from "./CommentItem";
import { CommentPlaceholder } from "./CommentPlaceholder";

interface AddCommentProps {
  selfie: ISelfie;
}

const createOptimisticComment = (randomId: number, comment: string, user: IUserSettings): ISelfieComment => ({
  comment,
  name: user.name,
  username: user.username,
  id: randomId,
  added_on: (new Date()).toISOString(),
  avatar: user.avatar,
});

export const AddComment = ({ selfie }: AddCommentProps): JSX.Element => {
  const { api, isAuthed, user } = useJwtTokenContext();
  const [comment, setComment] = useState<string>("");
  const [optimisticComments, setOptimisticComments] = useState<ISelfieComment[]>([]);
  const color = selfieTextColor(selfie);

  const handleFormSubmit = useCallback((e: PDefault): void => {
    e.preventDefault();
    if (!comment.length) {
      toast("Please enter a longer comment");
      return;
    }
    const randomId = Math.random();
    setOptimisticComments(oc => [createOptimisticComment(randomId, comment, user as IUserSettings), ...oc]);
    api<{ comment: ISelfieComment; }, { comment: string; selfie: string; }>({
      url: "/api/comments/post",
      body: { comment, selfie: selfie.hash },
    })
      .then(raiseOnError)
      .then(c => c.comment)
      .then(c => {
        setOptimisticComments(oc => [...oc.map(_oc => _oc.id === randomId ? c : _oc)]);
        setComment("");
      })
      .catch(() => {
        setOptimisticComments(oc => [...oc.filter(_oc => _oc.id !== randomId)]);
      });
  }, [api, comment, selfie.hash, user]);

  return (
    <>
      {
        isAuthed
          ? (

            <form onSubmit={handleFormSubmit} className="flex flex-row justify-between comment-styles">
              <FormControl className="grow">
                <Input
                  placeholder="Enter a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  type="text"
                  sx={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    boxShadow: "none",
                    color,
                    flexGrow: 1,
                    ":focus": {
                      outline: "none",
                    },
                    ":focus-visible": {
                      outline: "none",
                    },
                  }}
                  autoComplete="off"
                />
              </FormControl>
              <Button
                type="submit"
                sx={{
                  borderRadius: 0,
                  margin: "-.5rem",
                  backgroundColor: "white",
                  ":hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <span className="text-gray-800">
                  add comment
                </span>
              </Button>
            </form>
          )
          : (
            <CommentPlaceholder color={color}>
              <Link href="/auth/sign-in" className="underline hover:no-underline">sign in to add a comment</Link>
            </CommentPlaceholder>
          )
      }
      {
        optimisticComments.map(c =>
          <CommentItem key={c.id} comment={c} selfie={selfie} />,
        )
      }
    </>
  );
};
