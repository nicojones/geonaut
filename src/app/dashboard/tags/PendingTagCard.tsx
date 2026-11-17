"use client";

import { Button, Card, Typography } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
import { ITagDecision, respondToTag, selfieLcImage, selfieMyImage } from "@/functions";
import { IPendingTag, ISelfieAuthorStatus } from "@/types";

interface PendingTagCardProps {
  tag: IPendingTag;
}

export const PendingTagCard = ({ tag }: PendingTagCardProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [answer, setAnswer] = useState<ISelfieAuthorStatus | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const handleRespond = (decision: ITagDecision) => (): void => {
    setBusy(true);
    respondToTag(api, tag.active_hash, decision)
      .then(r => {
        setAnswer(r.status);
        toast.success(r.message);
      })
      .catch(err => toast.error(String(err?.message ?? err)))
      .finally(() => setBusy(false));
  };

  return (
    <Card sx={{ opacity: answer ? 0.6 : 1 }}>
      <Typography level="body-sm">
        <Link href={`/u/${tag.invited_by_username}`} className="font-bold hover:underline">
          {tag.invited_by_name || `@${tag.invited_by_username}`}
        </Link>
        {" "}says you were with them
      </Typography>
      <Link href={`/s/${tag.active_hash}`} className="grid grid-cols-2">
        <Image height={300} width={400} src={selfieMyImage(tag)} className="w-full aspect-[4/3] object-cover" alt={`${tag.title}, selfie`} />
        <Image height={300} width={400} src={selfieLcImage(tag)} className="w-full aspect-[4/3] object-cover" alt={`${tag.title}, what they saw`} />
      </Link>
      <Typography level="title-lg">{tag.title}</Typography>
      <Typography level="body-sm">{tag.short_desc} · {tag.selfie_place}</Typography>
      {
        answer
          ? (
            <Typography level="body-sm">
              {answer === "approved" ? "you're in! it's on your profile now" : "declined. it won't show anywhere"}
            </Typography>
          )
          : (
            <div className="flex space-x-2">
              <Button loading={busy} onClick={handleRespond("approve")}>that&apos;s me</Button>
              <Button variant="plain" color="neutral" disabled={busy} onClick={handleRespond("decline")}>not me</Button>
            </div>
          )
      }
    </Card>
  );
};
