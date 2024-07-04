"use client";

import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SelfieCard, SelfieCardSkeleton, SelfiesAsyncLoader } from "@/components/selfies";
import { useJwtTokenContext } from "@/context";
import { selfieNumResults } from "@/functions";
import { ISearchBody, ISearchFindMany, ISearchResultData, ISearchResultType } from "@/types";

import { SEARCH_TABS, SEARCH_TABS_MAP } from "./search-results-tab.definition";

interface SearchResultsProps {
  searchQuery: string;
  searchType?: ISearchResultType;
}

export const SearchResults = ({ searchQuery, searchType }: SearchResultsProps): JSX.Element => {
  const SEARCH_BODY: Record<number, ISearchBody> = useMemo(() => ({
    0: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS_MAP[0] },
    1: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS_MAP[1] },
    2: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS_MAP[2] },
    3: { s: "search", search: searchQuery, limit: 10, start: 0, type: SEARCH_TABS_MAP[3] },
  }), []);

  const { api } = useJwtTokenContext();
  const [results, setResults] = useState<ISearchResultData>({});
  const [selectedTab, setSelectedTab] = useState<number>(
    searchType
      ? Math.max(Object.values(SEARCH_TABS_MAP).findIndex(st => searchType === st), 0)
      : 0,
  );

  const handleFetchSearchResults = useCallback((_selectedTab: number = selectedTab): void => {
    if (results[SEARCH_TABS_MAP[_selectedTab]] !== undefined) {
      return;
    }

    api<ISearchFindMany, ISearchBody>({
      url: "/ajax/selfies",
      body: SEARCH_BODY[_selectedTab],
    })
      .then(r => {
        setResults(_results => ({ ..._results, [SEARCH_TABS_MAP[_selectedTab]]: r }));
      });
  }, [api, results, selectedTab]);

  const handleChangeSelectedTab = (_event: any, tabIndex: number | string | null): void => {
    setSelectedTab(Number(tabIndex));
  };

  useEffect(() => {
    Object.keys(SEARCH_BODY).forEach((_, index) => handleFetchSearchResults(index));
    // handleFetchSearchResults();
  }, []);

  // useEffect(() => {
  //   setResults({});
  //   handleFetchSearchResults();
  // }, [searchQuery]);

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
          {
            SEARCH_TABS.map((t, index) =>
              <Tab
                disabled={results[SEARCH_TABS_MAP[index]]?.selfies?.length === 0}
                value={index}
                key={t.value}
              >
                {t.label}
                <small>{selfieNumResults(results[SEARCH_TABS_MAP[index]])}</small>
              </Tab>,
            )
          }
        </TabList>
        <br />
        <br />
        {
          SEARCH_TABS.map((_, section: number) =>
            <TabPanel value={section} key={section}>
              {
                results[SEARCH_TABS_MAP[section]] !== undefined
                  ? (
                    results[SEARCH_TABS_MAP[section]]?.selfies.length === 0
                      ? (
                        <div className="grid place-items-center place-content-center h-[80vh]">
                          <span className="inline-block">(no {SEARCH_TABS_MAP[section]} results for <kbd>{searchQuery}</kbd>)</span>
                        </div>
                      )
                      : (
                        <SelfiesAsyncLoader
                          fetcher={SEARCH_BODY[section]}
                        >
                          {
                            results[SEARCH_TABS_MAP[section]]?.selfies.map(s =>
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
