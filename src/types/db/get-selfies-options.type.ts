
export interface IGetSelfiesOptions {
  /**
   * The ID of the current user (if is authenticated)
   * @default 0
   */
  selfId?: number;
  /**
   * @default 0
   */
  userId?: number;
  /**
   * @default 0
   */
  start?: number;
  /**
   * The number of results
   * @default 10
   */
  limit?: number;
}
