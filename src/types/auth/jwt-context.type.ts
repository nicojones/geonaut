import { IContext, IFetch, IUserSettings } from "@/types";

export interface IJwtContextOptions {
  /**
   * Redirect to this URL if the user is not authenticated
   */
  redirect?: string;
}

interface IJwtContextGeneric extends IContext {
  setJwt: (jwt: string | null) => void;
  setUser: (user: IUserSettings | null) => void;
  api: <
    T extends Record<string, any> = Record<string, any>,
    Body extends Record<string, any> | never = never,
  >(body: IFetch<Body>) => Promise<T>;
}

interface IJwtContextAnonymous {
  jwt: null;
  user: null;
  isAdmin: false;
  isAuthed: false;
}

interface IJwtContextAuthed {
  jwt: string;
  user: IUserSettings;
  isAdmin: boolean;
  isAuthed: true;
}

export type IJwtContextAuthedOrAnonymous = IJwtContextAnonymous | IJwtContextAuthed;

export type IJwtContext = IJwtContextGeneric & IJwtContextAuthedOrAnonymous;
