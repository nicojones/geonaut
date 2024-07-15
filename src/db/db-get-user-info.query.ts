import { IUserData } from "@/types";

import { getDbConnection } from "./db.config";

export const dbGetUserInfo = async (selfId: number, userId: number): Promise<IUserData> => {
  const [connection, close] = await getDbConnection();

  const [userFollowersInfoResult] = await connection.query(`
    SELECT SUM(followers) AS followers, SUM(following) AS following, SUM(pictures) AS pictures FROM (
        SELECT CAST(COUNT(f.follower) as UNSIGNED) AS followers, 0 AS following, 0 AS pictures FROM follow f WHERE f.followed = :userId
        UNION
        SELECT 0 AS followers, CAST(COUNT(f.followed) as UNSIGNED) AS following, 0 AS pictures FROM follow f WHERE f.follower = :userId
        UNION
        SELECT 0 AS followers, 0 AS following, CAST(COUNT(s.id) as UNSIGNED) AS pictures FROM selfies s WHERE s.user_id = :userId
    ) a
  `, { userId });

  const userFollowersInfo: IUserData = (userFollowersInfoResult as any[])[0];

  const [userProfileInfoResult] = await connection.query(`
      SELECT
        u.name,
        u.username,
        u.short_desc AS profile,
        u.hobbies,
        u.gender,
        IF(u.gender = "f", "her", "his") AS possessive,
        u.birthday,
        u.profile_pic,
        u.profile_pic_default
      FROM users u WHERE u.id = :userId
      LIMIT 1
    `, { userId });

  const userProfileInfo: IUserData = (userProfileInfoResult as any[])[0];

  let iFollowUser: boolean = false;
  if (selfId) {
    const [iFollowUserResult] = await connection.query(
      "SELECT f.* FROM follow f WHERE f.follower = :follower AND f.followed = :followed LIMIT 1",
      { follower: selfId, followed: userId },
    );
    iFollowUser = Boolean((iFollowUserResult as any[]).length);
  }

  close();

  const userData: IUserData = {
    ...userFollowersInfo,
    ...userProfileInfo,
    gender: +userProfileInfo.gender as IUserData["gender"],
    followers: +userFollowersInfo.followers,
    following: +userFollowersInfo.following,
    pictures: +userFollowersInfo.pictures,
    ifollow: iFollowUser,
  };

  if (userData.profile_pic) {
    userData.avatar = `${process.env.NEXT_PUBLIC_RESOURCES_URL as string}/images/pictures/uploads/${userData.profile_pic}/me.jpg`;
  } else {
    userData.avatar = `${process.env.NEXT_PUBLIC_FRONTEND_URL as string}/images/icons/default_profile/${userData.profile_pic_default}`;
  }

  return userData;
};
