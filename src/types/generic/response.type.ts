import { IBool } from "./booly.type";

export type IResponseData<T extends Record<string, any>> = T & {
  message: string;
  content: string;
};

export interface IResponse<T extends Record<string, any>> {
  success: IBool;
  responseData: IResponseData<T>;
}
