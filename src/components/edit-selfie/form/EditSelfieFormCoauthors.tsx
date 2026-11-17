"use client";

import { UserGroupIcon } from "@heroicons/react/16/solid";
import { Autocomplete, AutocompleteOption, Avatar, Chip, FormControl, FormHelperText, FormLabel, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { useMemo, useRef, useState } from "react";

import { useEditSelfieContext, useJwtTokenContext } from "@/context";
import { dbSearchUsers } from "@/db/db-search-users.query";
import { ISelfieAuthor } from "@/types";

const MAX_COAUTHORS = 10;

const STATUS_LABEL: Record<NonNullable<ISelfieAuthor["status"]>, string> = {
  pending: "waiting",
  approved: "",
  declined: "declined",
};

/**
 * "Who was with you?" — picks co-authors by username. They get asked to confirm once the post is published.
 *
 * The creator can remove anyone; a co-author can only remove people who haven't answered yet (PHP enforces it too).
 */
export const EditSelfieCoauthors = (): JSX.Element => {
  const { data, setSelfieData } = useEditSelfieContext();
  const { user } = useJwtTokenContext();
  const isCreator = data.is_creator ?? true;

  // Everyone we know details for, by username: the people tagged when the page loaded + anyone picked since
  const [known, setKnown] = useState<Record<string, ISelfieAuthor>>(
    () => Object.fromEntries((data.coauthors ?? []).map(a => [a.username, a])),
  );
  const [options, setOptions] = useState<ISelfieAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>();

  const value: ISelfieAuthor[] = useMemo(
    () => (data.selfie.coauthors ?? []).map(username => known[username] ?? { id: 0, username, name: username }),
    [data.selfie.coauthors, known],
  );
  const declined = useMemo(
    () => (data.coauthors ?? []).filter(a => a.status === "declined"),
    [data.coauthors],
  );

  const canRemove = (a: ISelfieAuthor): boolean => isCreator || a.status !== "approved";

  const handleSearch = (q: string): void => {
    clearTimeout(searchDebounceRef.current);
    if (q.trim().length < 2) {
      setOptions([]);
      return;
    }
    searchDebounceRef.current = setTimeout(() => {
      setLoading(true);
      dbSearchUsers(q, user?.id ?? 0)
        .then(setOptions)
        .catch(() => setOptions([]))
        .finally(() => setLoading(false));
    }, 300);
  };

  const handleChange = (newValue: ISelfieAuthor[]): void => {
    // people the current user isn't allowed to remove stay in the list
    const locked = value.filter(a => !canRemove(a) && !newValue.some(n => n.username === a.username));
    const next = [...newValue, ...locked].slice(0, MAX_COAUTHORS);
    setKnown(k => ({ ...Object.fromEntries(next.map(a => [a.username, a])), ...k }));
    setSelfieData({ coauthors: next.map(a => a.username) });
  };

  const unavailable = new Set<string>([
    ...value.map(a => a.username),
    ...declined.map(a => a.username),
  ]);

  return (
    <FormControl>
      <FormLabel>
        who was with you?
      </FormLabel>
      <Autocomplete
        multiple
        placeholder={value.length ? "" : "search people by @username"}
        startDecorator={<UserGroupIcon className="size-4" />}
        value={value}
        options={options.filter(o => !unavailable.has(o.username))}
        loading={loading}
        filterOptions={o => o}
        onInputChange={(_, q) => handleSearch(q)}
        onChange={(_, newValue) => handleChange(newValue)}
        getOptionLabel={o => `@${o.username}`}
        getOptionKey={o => o.username}
        isOptionEqualToValue={(o, v) => o.username === v.username}
        noOptionsText="nobody found"
        renderOption={(props, option) => (
          <AutocompleteOption {...props}>
            <ListItemDecorator>
              <Avatar size="sm" src={option.avatar} />
            </ListItemDecorator>
            <ListItemContent>
              @{option.username}
              <Typography level="body-xs">{option.name}</Typography>
            </ListItemContent>
          </AutocompleteOption>
        )}
        renderTags={(tags, getTagProps) =>
          tags.map((item, index) => {
            const { onClick, key, ...tagProps } = getTagProps({ index });
            const status = item.status ? STATUS_LABEL[item.status] : "";
            return (
              <Chip
                key={key}
                {...tagProps}
                variant="soft"
                color={item.status === "approved" ? "primary" : "neutral"}
                onClick={canRemove(item) ? onClick : undefined}
                endDecorator={canRemove(item) ? "×" : undefined}
                title={canRemove(item) ? "remove" : "only the author of the post can remove a confirmed co-author"}
              >
                @{item.username}
                {status && <Typography component="span" level="body-xs" sx={{ ml: 0.5, opacity: 0.6, display: "inline" }}>({status})</Typography>}
              </Chip>
            );
          })}
      />
      <FormHelperText>
        {
          data.selfie.visible
            ? "new people get asked to confirm when you save."
            : "they'll be asked to confirm once you publish."
        }
        {" "}once they do, the post shows on their profile too and they can edit it.
        {
          declined.length > 0 &&
          <> declined: {declined.map(a => `@${a.username}`).join(", ")}.</>
        }
      </FormHelperText>
    </FormControl>
  );
};
