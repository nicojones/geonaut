import { IResponse, IResponseData } from "@/types";

export const raiseOnError = <
  T extends Record<string, any> = Record<string, any>,
>(r: IResponse<T>): IResponseData<T> => {
  if (r.success) {
    return r.responseData;
  } else {
    console.error("UNSUCCESSFUL", r);
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw r.responseData;
  }
};
