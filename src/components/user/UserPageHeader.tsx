"use client";

import { Avatar, Button, Typography } from "@mui/joy";
import { useState } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
import { pluralise } from "@/functions";
import { IUserData } from "@/types";

import { UserPageHeaderMap } from "./UserPageHeaderMap";

interface UserPageHeaderProps {
  user: IUserData;
}

export const UserPageHeader = ({ user }: UserPageHeaderProps): JSX.Element => {
  const { api, isAuthed, user: me } = useJwtTokenContext();
  const [follow, setFollow] = useState<boolean | null>(
    isAuthed && user.username !== me.username
      ? Boolean(user.ifollow)
      : null,
  );
  const updatedFollowers: number = (user.followers - Number(user.ifollow) + Number(follow));

  const handleToggleFollow = (): void => {
    setFollow(_f => !_f);
    api<any, any>({
      url: "/api/follow",
      body: { username: user.username },
    })
      .catch(e => {
        setFollow(_f => !_f);
        toast.error(String(e));
      });
  };

  return (
    <>
      <div className="flex flex-col space-y-4 justify-center w-full">
        <div className="fric justify-center space-x-6">
          <Typography level="h1">@{user.username}</Typography>
          {
            follow !== null && (
              <Button
                size="sm"
                onClick={handleToggleFollow}
                color={follow ? "neutral" : "success"}
                variant="soft"
                sx={{ p: 0.5 }}
              >
                {follow ? "following" : "follow"}
              </Button>
            )
          }
        </div>
        <div className="fric space-x-8 w-full">
          <Avatar src={user.avatar} alt={user.name} sx={{ width: 128, height: 128 }} variant="outlined" />
          <div className="flex flex-col space-y-4 shrink basis-full">
            <div className="fric justify-between">
              <span>{pluralise(user.pictures, ["picture", "pictures"])}</span>
              <span>{pluralise(updatedFollowers, ["follower", "followers"])}</span>
              <span>{user.following} following</span>
            </div>
            <Typography>
              <Typography level="body-lg">{user.name}</Typography>
              {" "}
              <Typography>{user.profile}</Typography>
            </Typography>
          </div>
        </div>
        {
          user.pictures >= 1 &&
          <UserPageHeaderMap username={user.username} />
        }
      </div>
    </>
  );
};
