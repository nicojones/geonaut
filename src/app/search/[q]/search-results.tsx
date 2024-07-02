"use client";

import { CalendarIcon, MapPinIcon, PhotoIcon, UserIcon } from "@heroicons/react/16/solid";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SelfieCard, SelfieCardSkeleton, SelfiesAsyncLoader } from "@/components/selfies";
import { useJwtTokenContext } from "@/context";
import { ISearchBody, ISearchFindMany, ISearchResultData, ISearchResultType } from "@/types";

interface SearchResultsProps {
  searchQuery: string;
  searchType?: ISearchResultType;
}

const SEARCH_TABS: Record<number, Exclude<ISearchResultType, "all">> = {
  0: "selfie",
  1: "location",
  2: "date",
  3: "user",
} as const;

const numResults = (results: number | undefined): string =>
  results === undefined
    ? ""
    : (

      results === 1
        ? "(1 result)"
        : `(${results} results)`
    );

export const SearchResults = ({ searchQuery, searchType }: SearchResultsProps): JSX.Element => {
  const SEARCH_BODY: Record<number, ISearchBody> = useMemo(() => ({
    0: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS[0] },
    1: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS[1] },
    2: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS[2] },
    3: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS[3] },
  }), []);
  const { api } = useJwtTokenContext();
  const [results, setResults] = useState<ISearchResultData>({});
  const [selectedTab, setSelectedTab] = useState<number>(
    searchType
      ? Math.max(Object.values(SEARCH_TABS).findIndex(st => searchType === st), 0)
      : 0,
  );

  const handleFetchSearchResults = useCallback((): void => {
    if (selectedTab >= 4) return;
    if (results[SEARCH_TABS[selectedTab]] !== undefined) {
      return;
    }

    console.log("will fetch", SEARCH_TABS[selectedTab]);

    api<ISearchFindMany, ISearchBody>({
      url: "/ajax/selfies",
      body: SEARCH_BODY[selectedTab],
    })
      .then(r => {
        setResults(_results => ({ ..._results, [SEARCH_TABS[selectedTab]]: r.selfies }));
      });
  }, [api, results, selectedTab]);

  const handleChangeSelectedTab = (_event: any, tabIndex: number | string | null): void => {
    console.log("tab index?", tabIndex);
    setSelectedTab(Number(tabIndex));
  };

  useEffect(() => {
    handleFetchSearchResults();
  }, [selectedTab]);

  return (
    <>
      <Tabs
        aria-label="Search results"
        value={selectedTab}
        onChange={handleChangeSelectedTab}
        sx={{ width: "100%", overflowX: "visible", backgroundColor: "transparent" }}
      >
        <TabList
          sticky="top"
          tabFlex={1}
          disableUnderline
        >
          <Tab
            disabled={results[SEARCH_TABS[0]]?.length === 0}
            value={0}
          >
            <PhotoIcon className="size-10" />
            <small>{numResults(results[SEARCH_TABS[0]]?.length)}</small>
          </Tab>
          <Tab
            disabled={results[SEARCH_TABS[1]]?.length === 0}
            value={1}
          >
            <MapPinIcon className="size-10" />
            <small>{numResults(results[SEARCH_TABS[1]]?.length)}</small>
          </Tab>
          <Tab
            disabled={results[SEARCH_TABS[2]]?.length === 0}
            value={2}
          >
            <CalendarIcon className="size-10" />
            <small>{numResults(results[SEARCH_TABS[2]]?.length)}</small>
          </Tab>
          <Tab
            disabled={results[SEARCH_TABS[3]]?.length === 0}
            value={3}
          >
            <UserIcon className="size-10" />
            <small>{numResults(results[SEARCH_TABS[3]]?.length)}</small>
          </Tab>
        </TabList>
        <br />
        <br />
        {
          [0, 1, 2, 3].map((section: number) =>
            <TabPanel value={section} key={section}>
              {
                results[SEARCH_TABS[section]] !== undefined
                  ? (
                    results[SEARCH_TABS[section]]?.length === 0
                      ? (
                        <div className="grid place-items-center place-content-center h-[80vh]">
                          <span className="inline-block">(no {SEARCH_TABS[section]} results for <kbd>{searchQuery}</kbd>)</span>
                        </div>
                      )
                      : (
                        <SelfiesAsyncLoader
                          fetcher={SEARCH_BODY[section]}
                        >
                          {
                            results[SEARCH_TABS[section]]?.map(s =>
                              <SelfieCard key={s.active_hash} selfie={s} />,
                            )
                          }
                        </SelfiesAsyncLoader>
                      )
                  )
                  : (
                    <>
                      <SelfieCardSkeleton />
                      <SelfieCardSkeleton />
                    </>
                  )
              }
            </TabPanel>,
          )
        }
      </Tabs>
    </>
  );
};
