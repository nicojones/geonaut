export interface IFetch<Body> {
  /**
   * @default "/selfies"
   */
  url?: string;
  /**
   * @default POST
   */
  method?: "PUT" | "POST" | "GET" | "DELETE";
  /**
   * @default {}
   */
  body?: Body;
  /**
   * @default "application/x-www-form-urlencoded"
   * set to `false` to not send it
   */
  contentType?: string | false;
}
