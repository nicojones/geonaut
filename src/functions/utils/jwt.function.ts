import { jwtDecode } from "jwt-decode";

import { IUserSettings } from "@/types";

export const getUserFromJwt = (jwt: string | null): IUserSettings | null =>
  (jwt ? jwtDecode<{ data: IUserSettings; }>(jwt)?.data ?? null : null);
