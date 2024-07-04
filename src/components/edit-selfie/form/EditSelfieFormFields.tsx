import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/16/solid";
import { MapboxSearchBox } from "@mapbox/search-js-web";
import { Button, FormControl, FormHelperText, FormLabel, Input, Textarea, Typography } from "@mui/joy";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/navigation";
import { ChangeEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

import { Map } from "@/components/generic";
import { DEFAULT_MAP_ZOOM, SET_PIN_MAP_ZOOM } from "@/config";
import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { createZodErrorObject, delay, deleteSelfie, selfiePin } from "@/functions";
import { IEditSelfieGps, IMapPin, ISelfieEdit, ZodErrorMapping } from "@/types";
import { EditSelfieValidator } from "@/validators";

interface EditSelfieFormFieldsProps {
  onSubmit: () => any;
}

export const EditSelfieFormFields = ({ onSubmit }: EditSelfieFormFieldsProps): JSX.Element => {
  const { api } = useJwtTokenContext();
  const { data, setData, hasImages, markers } = useEditSelfieContext();
  const [errors, setErrors] = useState<ZodErrorMapping<ISelfieEdit>>({});
  const [zoom, setZoom] = useState<number>(DEFAULT_MAP_ZOOM);
  const mapboxGeocoderRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const searchBoxRef = useRef<MapboxSearchBox>() as MutableRefObject<MapboxSearchBox>;
  const router = useRouter();

  const handleSetData = useCallback((newData: ISelfieEdit): void => {
    const valid = EditSelfieValidator.safeParse(newData);
    if (valid.success) {
      setErrors({});
    } else {
      setErrors(createZodErrorObject<ISelfieEdit>(valid.error.issues));
    }
    setData(_d => ({ ..._d, selfie: newData }));
  }, []);

  const handleValueChange = (key: keyof ISelfieEdit):
  ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      handleSetData({ ...data.selfie, [key]: event.target.value });
  };

  const handleUpdateCoords = useCallback((gps: Partial<IEditSelfieGps>): void => {
    handleSetData({ ...data.selfie, ...gps });
  }, [data]);

  const handleDeleteSelfie = (): void => {
    deleteSelfie(api, { name: data.selfie.title, hash: data.selfie.hash }, _r => router.push("/new"));
  };

  const handleGeocoderLoaded = (map: mapboxgl.Map): void => {
    // instantiate a <mapbox-search-box> element using the MapboxSearchBox class
    searchBoxRef.current = new MapboxSearchBox();

    searchBoxRef.current.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN as string;
    searchBoxRef.current.theme = {
      variables: {
        boxShadow: "var(--joy-shadowRing, 0 0 #000),0px 1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))",
        border: "1px solid var(--variant-outlinedBorder, var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-300, #CDD7E1)))",
      },
    };

    // append <mapbox-search-box> to the document
    mapboxGeocoderRef.current.appendChild(searchBoxRef.current as any);
    // mapboxGeocoderRef.current = new MapboxGeocoder();
    searchBoxRef.current.addEventListener("retrieve", function (ev) {
      console.log(ev);
      const [lng, lat] = ev.detail.features[0].geometry.coordinates;
      const place = ev.detail.features[0].properties.full_address;

      handleUpdateCoords({ place, lat, lng });
      delay(() => {
        searchBoxRef.current.value = place;
      });
      console.log(searchBoxRef.current);
    });

    delay(() => {
      searchBoxRef.current.value = data.selfie.place;
    });
  };

  if (!hasImages) {
    return <Typography level="h2" sx={{ marginX: "auto", marginY: 20, color: "#ccc" }}>Add an image to continue</Typography>;
  }

  return (
    <form
      className="flex flex-col space-y-10"
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
    >
      <div className="flex items-start space-x-10">
        <div className="flex flex-col space-y-10 flex-1">
          <FormControl error={!!errors.title}>
            <FormLabel>
              title
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
            {/* <Input
              value={data.selfie.gps.place}
              onChange={e => handleUpdateCoords({ place: e.target.value })}
            /> */}
            <div className="w-full" ref={mapboxGeocoderRef} />
            {errors?.place && <FormHelperText>{errors.place}</FormHelperText>}
          </FormControl>
        </div>
      </div>
      {/* <EditSelfieMap
        onPlaceSet={(lat, lng, place) => handleUpdateCoords({ place, coordinates: { lat, lng } })}
        // autocompleteBoxRef={mapboxGeocoderRef}
        onGeocoderLoaded={handleGeocoderLoaded}
      /> */}
      <Map
        className="relative overflow-hidden h-[40rem] w-full"
        markers={markers}
        style="streets"
        changeStyleOnDragTo="streets"
        onExtraConfigLoaded={handleGeocoderLoaded}
        zoom={zoom}
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
