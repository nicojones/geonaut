import { IResponseData } from "./response.type";

export interface IResponseRedirect {
  redirect: string;
  new: boolean;
}

export type IRedirectionResponse = Partial<IResponseData<IResponseRedirect>>;
