import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

import { MapViewer } from "@/components/generic";
import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { deleteSelfie, getCoords } from "@/functions";
import { IEditSelfieCoords, ISelfieEdit } from "@/types";

import { EditSelfieCustomUrl } from "./EditSelfieCustomUrl";
import { EditSelfieDescriptionField } from "./EditSelfieDescriptionField";
import { EditSelfieFormAutocomplete } from "./EditSelfieFormAutocomplete";

interface EditSelfieFormFieldsProps {
  onSubmit: () => any;
}

export const EditSelfieFormFields = ({ onSubmit }: EditSelfieFormFieldsProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data, errors, setSelfieData, hasImages, markers } = useEditSelfieContext();
  const router = useRouter();
  const dateFromPicture: string | undefined = hasImages?.me ? data.images.me.date : data.images.lc.date;

  const handleValueChange = (key: keyof ISelfieEdit):
  ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      setSelfieData({ [key]: event.target.value });
  };

  const handleUpdateCoords = useCallback((place: string, coords?: IEditSelfieCoords): void => {
    setSelfieData({ place, ...(coords ?? {}) });
  }, [data]);

  const handleDeleteSelfie = (): void => {
    deleteSelfie(api, { name: data.selfie.title, hash: data.selfie.hash }, _r => router.push("/new"));
  };

  const handleSetPictureDate = (): void => {
    // `hasImages` is not undefined
    setSelfieData({ date: dateFromPicture });
  };

  if (!hasImages) {
    return (
      <Typography
        level="h4"
        sx={{ marginX: "auto", paddingY: 10, color: "#ccc" }}
        className="text-inset-shadow"
      >
        Add images first
      </Typography>
    );
  }

  return (
    <form
      className="flex flex-col space-y-10"
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
    >
      <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 items-start">
        <div className="flex flex-col space-y-10 flex-1 w-full">
          <FormControl error={!!errors.title}>
            <FormLabel sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <span>title</span>
              <EditSelfieCustomUrl />
            </FormLabel>
            <Input
              value={data.selfie.title}
              onChange={handleValueChange("title")}
            />
            {errors.title && <FormHelperText>{errors.title}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.subtitle}>
            <FormLabel>
              some words
            </FormLabel>
            <Input
              value={data.selfie.subtitle}
              onChange={handleValueChange("subtitle")}
            />
            {errors.subtitle && <FormHelperText>{errors.subtitle}</FormHelperText>}
          </FormControl>
        </div>
        <div className="flex flex-col space-y-10 flex-1 w-full">
          <FormControl error={!!errors.date}>
            <FormLabel sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <span>date</span>
              <span className="fric space-x-4 subtle-hover">
                {
                  dateFromPicture &&
                  <a
                    role="button"
                    className="cursor-pointer hover:underline"
                    onClick={handleSetPictureDate}
                  >from picture
                  </a>
                }
                <a
                  role="button"
                  className="cursor-pointer hover:underline"
                  onClick={() => setSelfieData({ date: (new Date()).toISOString().split("T")[0] })}
                >today
                </a>
              </span>
            </FormLabel>
            <Input
              value={data.selfie.date}
              onChange={handleValueChange("date")}
              type="date"
              sx={{ textAlign: "left" }}

            />
            {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.place}>
            <FormLabel sx={{ width: "100%" }}>
              place
              <pre className="ml-auto text-xs subtle-hover">{getCoords(data.selfie)}</pre>
            </FormLabel>
            <EditSelfieFormAutocomplete
              onUpdateCoords={handleUpdateCoords}
            />
            {errors?.place && <FormHelperText>{errors.place}</FormHelperText>}
          </FormControl>
        </div>
      </div>
      <MapViewer
        className="relative overflow-hidden h-[40rem] w-full"
        markers={markers}
        style="streets"
        changeStyleOnDragTo="streets"
      />
      <EditSelfieDescriptionField
        value={data.selfie.description}
        onChange={v => setSelfieData({ description: v })}
        error={errors.description}
      />

      <Button
        startDecorator={<PaperAirplaneIcon className="size-6" />}
        type="submit"
        variant="soft"
      >
        publish
      </Button>
      <Button
        startDecorator={<TrashIcon className="size-4" />}
        onClick={handleDeleteSelfie}
        variant="soft"
        color="danger"
        size="sm"
      >
        delete
      </Button>

    </form>
  );
};
