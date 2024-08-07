"use client";
import { Input } from "@mui/joy";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import { getSearchResults } from "@/functions/server/get-search-results.function";
import { PDefault } from "@/types";

export const SearchEverywhere = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSearch = (e: PDefault): void => {
    e.preventDefault();
    e.stopPropagation();
    getSearchResults("all", value, true)
    // api<ISearchFindAll, ISearchBody>({
    //   url: "/api/selfies",
    //   body: { search: value, return: 1, s: "search" },
    // })
      .then(r => {
        if ("redirect" in r) {
          const selfiesTab = (r.searchType && r.searchType !== "selfie" ? `?type=${r.searchType}` : "");
          router.push(r.redirect + selfiesTab);
        } else {
          toast.error(<>No results for <kbd>{value}</kbd></>);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="search everywhere"
          value={value}
          onChange={handleChangeValue}
          type="text"
          sx={{ width: "100%" }}
        />
      </form>
    </>
  );
};
