"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { raiseOnError } from "@/functions";
import { EditSelfieValidator } from "@/validators";

import { EditSelfieFormFields } from "./form";
import { ImagesUploaderBox } from "./uploader";
import { saveEditSelfie } from "./uploader/functions/save-edit.function";

export const EditSelfieForm = (): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data } = useEditSelfieContext();
  const router = useRouter();
  const autosaveTimeoutRef = useRef<any>();
  const lastAutosaveRef = useRef<string>(JSON.stringify(data.selfie));

  const handleFormSubmit = (): void => {
    const valid = EditSelfieValidator.safeParse(data.selfie);
    if (!valid.success) {
      toast.error("please correct the errors!");
      return;
    }

    toast.promise(
      saveEditSelfie(data.selfie),
      {
        success: r => {
          router.push(r.redirect);
          return r.message;
        },
        error: e => {
          return String(e);
        },
      },
    );
  };

  useEffect(() => {
    if (
      !data.selfie.visible &&
      JSON.stringify(data.selfie) !== lastAutosaveRef.current
    ) {
      clearTimeout(autosaveTimeoutRef.current);
      autosaveTimeoutRef.current = setTimeout(() => {
        const autosavePromise = api<any, any>({
          url: "/api/selfie/save-changes",
          body: data.selfie,
        })
          .then(raiseOnError);
        toast.promise(autosavePromise, {
          success: () => {
            lastAutosaveRef.current = JSON.stringify(data.selfie);
            return "(saved in the background)";
          },
          error: (err) => String(err),
        });
      }, 5000);
    }

    const timeout = autosaveTimeoutRef.current;
    return () => clearTimeout(timeout);
  }, [data.selfie]);

  return (
    <div className="flex flex-col space-y-8 w-[95vw] sm:w-[90vw] mx-auto lg:w-[60vw]">
      <ImagesUploaderBox />

      <EditSelfieFormFields onSubmit={handleFormSubmit} />
    </div>
  );
};
