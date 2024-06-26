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
}
