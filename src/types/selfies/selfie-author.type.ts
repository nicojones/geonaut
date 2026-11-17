export type ISelfieAuthorStatus = "pending" | "approved" | "declined";

/**
 * A co-author of a selfie (table `selfie_authors`). The creator is `ISelfie.user_id`, never in this list.
 */
export interface ISelfieAuthor {
  id: number;
  username: string;
  name: string;
  avatar?: string;
  /**
   * Only set in the edit form (from PHP `s=edit`). Lists shown to the public only contain approved co-authors.
   */
  status?: ISelfieAuthorStatus;
}
