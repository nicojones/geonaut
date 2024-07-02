"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

import { useJwtTokenContext } from "@/context";
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
      if (prompt("Type delete to continue")?.toLowerCase() === "delete") {
        const promise = api({ method: "DELETE", url: `/ajax/selfie/delete/${selfie.hash}` });
        toast.promise(promise, {
          success: () => {
            router.push("/");
            return `${selfie.name} Deleted!`;
          },
          error: (e) => {
            console.error(e);
            return String(e);
          },
        });
      }
    },
    [api, selfie],
  );

  return (
    isAuthed && isMine
      ? (
        <span className="absolute left-[50%] top-8 translate-x-[-50%] flex flex-col space-y-2">
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
