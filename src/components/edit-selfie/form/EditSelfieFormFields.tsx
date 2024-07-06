import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button, FormControl, FormHelperText, FormLabel, Input, Textarea, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback } from "react";

import { MapViewer } from "@/components/generic";
import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { deleteSelfie } from "@/functions";
import { IEditSelfieCoords, ISelfieEdit } from "@/types";

import { EditSelfieCustomUrl } from "./EditSelfieCustomUrl";
import { EditSelfieFormAutocomplete } from "./EditSelfieFormAutocomplete";

interface EditSelfieFormFieldsProps {
  onSubmit: () => any;
}

export const EditSelfieFormFields = ({ onSubmit }: EditSelfieFormFieldsProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data, errors, setSelfieData, hasImages, markers } = useEditSelfieContext();
  const router = useRouter();

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
      <div className="flex items-start space-x-10">
        <div className="flex flex-col space-y-10 flex-1">
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
        <div className="flex flex-col space-y-10 flex-1">
          <FormControl error={!!errors.date}>
            <FormLabel>
              date
            </FormLabel>
            <Input
              value={data.selfie.date}
              onChange={handleValueChange("date")}
              type="date"

            />
            {errors.date && <FormHelperText>{errors.date}</FormHelperText>}
          </FormControl>
          <FormControl error={!!errors.place}>
            <FormLabel sx={{ width: "100%" }}>
              place
              <pre className="ml-auto text-xs">({data.selfie.lat}, {data.selfie.lng})</pre>
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
      <FormControl error={!!errors.description}>
        <FormLabel>
          description
        </FormLabel>
        <Textarea
          minRows={8}
          value={data.selfie.description}
          onChange={handleValueChange("description")}
        />
        {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
      </FormControl>

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
