import { Avatar, Typography } from "@mui/joy";

import { API_URL } from "@/config";
import { IUserData } from "@/types";

interface UserPageHeaderProps {
  user: IUserData;
}

export const UserPageHeader = ({ user }: UserPageHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-col space-y-4 justify-center">
      <div className="fric justify-center">
        <Typography level="h1">@{user.username}</Typography>
      </div>
      <div className="fric space-x-8">
        <Avatar src={API_URL + user.avatar} alt="Avatar" className="rounded-full size-32" />
        <div className="flex flex-col space-y-4">
          <div className="fric justify-between">
            <span>{user.pictures} pictures</span>
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
          </div>
          <Typography>
            <Typography level="body-lg">{user.name}</Typography>
            {" "}
            <Typography>{user.profile}</Typography>
          </Typography>
        </div>
      </div>
    </div>
  );
};
