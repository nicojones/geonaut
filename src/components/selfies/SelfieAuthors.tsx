import Link from "next/link";
import { Fragment } from "react";

import { ISelfie } from "@/types";

interface SelfieAuthorsProps {
  readonly selfie: Pick<ISelfie, "username" | "coauthors">;
}

/**
 * "@creator & @ana & @leo": the creator first, then the approved co-authors, each linking to their profile.
 */
export const SelfieAuthors = ({ selfie }: SelfieAuthorsProps): JSX.Element => {
  const usernames = [selfie.username, ...(selfie.coauthors ?? []).map(a => a.username)];
  return (
    <span className="inline-flex flex-wrap gap-x-1">
      {usernames.map((username, i) => (
        <Fragment key={username}>
          {i > 0 && <span className="opacity-60">&amp;</span>}
          <Link href={`/u/${username}`} className="as-link">@{username}</Link>
        </Fragment>
      ))}
    </span>
  );
};
