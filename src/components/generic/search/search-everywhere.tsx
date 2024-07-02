"use client";
import { Input } from "@mui/joy";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { useJwtTokenContext } from "@/context";
import { IResponseData, ISearchBody, ISearchFindAll, PDefault } from "@/types";

export const SearchEverywhere = (): JSX.Element => {
  const { api } = useJwtTokenContext();
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSearch = (e: PDefault): void => {
    e.preventDefault();
    e.stopPropagation();
    api<IResponseData<ISearchFindAll>, ISearchBody>({
      url: "/ajax/selfies",
      body: { search: value, return: 1, s: "search" },
    })
      .then(r => {
        const selfiesTab = (r.searchType && r.searchType !== "selfie" ? `?type=${r.searchType}` : "");
        router.push(r.redirect + selfiesTab);
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
        />
      </form>
    </>
  );
};
