import { IResponseData } from "./response.type";

export interface IResponseRedirect {
  redirect: string;
}

export type IRedirectionResponse = Partial<IResponseData<IResponseRedirect>>;
