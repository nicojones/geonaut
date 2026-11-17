"use client";

import { Button } from "@mui/joy";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

import { useJwtTokenContext, useNotificationsContext } from "@/context";
import { ITagDecision, respondToTag } from "@/functions";
import { INotification, ISelfieAuthorStatus } from "@/types";

interface NotificationTagRequestProps {
  notification: INotification;
}

export const NotificationTagRequest = ({ notification: n }: NotificationTagRequestProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { refresh } = useNotificationsContext();
  const [answer, setAnswer] = useState<ISelfieAuthorStatus | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const handleRespond = (decision: ITagDecision) => (e: MouseEvent): void => {
    // the row itself toggles read/unread on click
    e.stopPropagation();
    setBusy(true);
    respondToTag(api, n.active_hash, decision)
      .then(r => {
        setAnswer(r.status);
        toast.success(r.message);
        refresh();
      })
      .catch(err => toast.error(String(err?.message ?? err)))
      .finally(() => setBusy(false));
  };

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
        says you were in
        &nbsp;
        <Link
          href={`/s/${n.active_hash}`}
          className="font-bold cursor-pointer hover:underline"
          onClick={e => e.stopPropagation()}
        >{n.title}
        </Link>
      </span>
      {
        answer
          ? <span className="text-xs opacity-70">{answer === "approved" ? "you're in! it's on your profile now" : "declined"}</span>
          : (
            <span className="flex space-x-2">
              <Button size="sm" variant="solid" loading={busy} onClick={handleRespond("approve")}>that&apos;s me</Button>
              <Button size="sm" variant="plain" color="neutral" disabled={busy} onClick={handleRespond("decline")}>not me</Button>
            </span>
          )
      }
    </>
  );
};
