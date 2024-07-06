import { IBool } from "./booly.type";

export type IResponseData<T extends Record<string, any> = Record<string, never>> = T & {
  message: string;
  content: string;
};

export interface IResponse<T extends Record<string, any> = Record<string, never>> {
  success: IBool;
  responseData: IResponseData<T>;
}
