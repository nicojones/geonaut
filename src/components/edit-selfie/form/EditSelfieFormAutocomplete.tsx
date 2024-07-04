import { BuildingLibraryIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Autocomplete, AutocompleteOption, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useEditSelfieContext } from "@/context";
import { randomUUID, toQuery } from "@/functions";
import { IEditSelfieCoords } from "@/types";

interface EditSelfieFormAutocompleteProps {
  onUpdateCoords: (place: string, coords?: IEditSelfieCoords) => void;
}
interface IMapboxSuggestionResult {
  suggestions: IMapboxSuggestion[];
}
interface IMapboxSuggestion {
  mapbox_id: string;
  name: string;
  place_formatted: string;
  feature_type: "poi" | "country" | "region" | "postcode" | "district" | "place" | "locality" | "neighborhood" | "address";
}
interface IMapboxPlaceResult {
  features: IMapboxPlace[];
}
interface IMapboxPlace {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    address: string;
    full_address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

const CREDENTIALS = {
  access_token: process.env.NEXT_PUBLIC_MAP_TOKEN as string,
  session_token: randomUUID(),
} as const;

export const EditSelfieFormAutocomplete = ({ onUpdateCoords }: EditSelfieFormAutocompleteProps): JSX.Element => {
  const { data } = useEditSelfieContext();
  const [suggestions, setSuggestions] = useState<IMapboxSuggestion[]>([]);
  const suggestionsDebounceRef = useRef<any>(null);

  const handleSearchSuggestions = (q: string): void => {
    clearTimeout(suggestionsDebounceRef.current);
    suggestionsDebounceRef.current = setTimeout(() => {
      if (q.length < 3) {
        return;
      }
      fetch(`https://api.mapbox.com/search/searchbox/v1/suggest${toQuery({ q, ...CREDENTIALS })}`)
        .then(r => r.json() as Promise<IMapboxSuggestionResult>)
        .then(r => {
          console.log(r);
          setSuggestions((r).suggestions);
        })
        .catch(e => {
          toast.error(String(e));
        });
    }, 300);
  };

  const handleRetrieveSuggestion = (newValue: null | string | IMapboxSuggestion): void => {
    if (newValue === null || typeof newValue === "string") {
      return;
    }
    console.log(newValue);
    fetch(`https://api.mapbox.com/search/searchbox/v1/retrieve/${newValue.mapbox_id}${toQuery(CREDENTIALS)}`)
      .then(r => r.json())
      .then(r => {
        const [lng, lat] = (r as IMapboxPlaceResult).features[0].geometry.coordinates;
        const place = (r as IMapboxPlaceResult).features[0].properties.full_address;

        onUpdateCoords(place, { lat, lng });
      })
      .catch(e => {
        toast.error(String(e));
      });
  };
  return (
    <>
      <Autocomplete
        inputValue={data.selfie.place}
        onInputChange={(_, newValue) => {
          handleSearchSuggestions(newValue);
          onUpdateCoords(newValue);
        }}
        options={suggestions}
        autoHighlight
        onChange={(_, newValue) => handleRetrieveSuggestion(newValue)}
        freeSolo
        getOptionLabel={(o: IMapboxSuggestion | string) => typeof o === "string" ? o : o.name}
        getOptionKey={(o: IMapboxSuggestion | string) => typeof o === "string" ? o : o.mapbox_id}
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemDecorator>
              {
                option.feature_type === "poi"
                  ? <BuildingLibraryIcon className="size-4" />
                  : <MapPinIcon className="size-4" />
              }
            </ListItemDecorator>
            <ListItemContent>
              {option.name}
              <Typography level="body-xs">{option.place_formatted}</Typography>
            </ListItemContent>
          </AutocompleteOption>
        )}
      />
    </>
  );
};
