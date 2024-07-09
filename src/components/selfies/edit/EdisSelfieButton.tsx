"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useJwtTokenContext } from "@/context";
import { deleteSelfie } from "@/functions";
import { ISelfie } from "@/types";

interface EditSelfieProps {
  selfie: ISelfie;
  /**
   * Shows a delete button on hover
   * @default false
   */
  allowDelete?: boolean;
}

const CLASS_NAME_LINK = "cursor-pointer hover:drop-shadow-sm transition-all relative select-none" as const;
const CLASS_NAME_ICON = "size-7 bg-white rounded-full z-10 p-1" as const;

export const EditSelfieButton = ({ allowDelete, selfie }: EditSelfieProps): JSX.Element => {
  const { api, isAuthed, user } = useJwtTokenContext();
  const isMine = (user?.id === selfie.user_id);
  const router = useRouter();

  const handleDeleteSelfie = useCallback(
    (): void => {
      deleteSelfie(api, selfie, _r => router.push("/"));
    },
    [api, selfie],
  );

  return (
    isAuthed && isMine
      ? (
        <span className="absolute left-[90%] lg:left-[50%] top-1/2 translate-y-[-50%] lg:translate-y-0 lg:top-8 translate-x-[-50%] flex lg:flex-col flex-row lg:space-y-2 lg:space-x-0 space-x-2">
          <Link
            href={`/edit/${selfie.hash}`}
            className={CLASS_NAME_LINK}
          >
            <PencilSquareIcon className={CLASS_NAME_ICON} />
          </Link>
          {
            allowDelete && (
              <a
                role="button"
                onClick={handleDeleteSelfie}
                className={classNames(CLASS_NAME_LINK, "opacity-40 hover:opacity-100")}
              >
                <TrashIcon className={classNames(CLASS_NAME_ICON, "text-red-500")} />
              </a>
            )
          }
        </span>
      )
      : (
        <></>
      )
  );
};
