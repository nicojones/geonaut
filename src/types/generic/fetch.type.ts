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
  /**
   * An abort signal
   */
  signal?: AbortSignal;
  /**
   * Invalidate cache
   */
  cache?: "no-store";
  /**
   * Tags for cache revalidation
   * @default []
   */
  cacheTags?: string[];
}
