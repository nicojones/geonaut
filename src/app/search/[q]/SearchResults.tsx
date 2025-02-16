"use client";

import { Skeleton, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SelfieCard, SelfieCardSkeleton, SelfiesAsyncLoader } from "@/components";
import { selfieNumResults } from "@/functions";
import { getSearchResults } from "@/functions/server/get-search-results.function";
import { ISearchResultData, ISearchResultType, ISelfieFetcher, ISelfiesData } from "@/types";

import { SEARCH_TABS, SEARCH_TABS_MAP } from "./search-results-tab.definition";

interface SearchResultsProps {
  searchQuery: string;
  searchType: ISearchResultType;
}

export const SearchResults = ({ searchQuery, searchType }: SearchResultsProps): JSX.Element => {
  const initialFetchRef = useRef<boolean>(true);
  const [results, setResults] = useState<ISearchResultData>({});
  const [selectedTab, setSelectedTab] = useState<number>(
    searchType
      ? Math.max(Object.values(SEARCH_TABS_MAP).findIndex(st => searchType === st), 0)
      : 0,
  );

  const handleGetSearchResults = (start: number, type: ISearchResultType): Promise<ISelfiesData> => {
    return getSearchResults(type, searchQuery, false, start, 10)
      .then((r: ISelfiesData) => {
        setResults(_results => {
          return ({
            ..._results,
            [type]: _results[type] ?? r,
          });
        });
        return r;
      });
  };

  const handleSearch = useMemo<Record<ISearchResultType, ISelfieFetcher>>(() => ({
    selfie: start => handleGetSearchResults(start, "selfie"),
    location: start => handleGetSearchResults(start, "location"),
    date: start => handleGetSearchResults(start, "date"),
    user: start => handleGetSearchResults(start, "user"),
  }), []);

  const handleChangeSelectedTab = useCallback((_event: any, tabIndex: number | string | null): void => {
    setSelectedTab(Number(tabIndex));
  }, []);

  useEffect(() => {
    if (initialFetchRef.current) {
      const firstSearchType: ISearchResultType = searchType ?? "selfie";
      // Fetch search results (either first tab, or requested tab)
      handleGetSearchResults(0, firstSearchType)
        .then(() => {
          Object.values(SEARCH_TABS_MAP)
            // Don't fetch twice!
            .filter(t => t !== firstSearchType)
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            .forEach((_type) => handleGetSearchResults(0, _type));
        });
      initialFetchRef.current = false;
    }
  }, []);

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
                // disabled={results[SEARCH_TABS_MAP[index]]?.selfies?.length === 0}
                value={index}
                key={t.value}
                className="flex-col md:flex-row flex"
              >
                <div className="shrink-0">{t.label}</div>
                {
                  results[SEARCH_TABS_MAP[index]]
                    ? <small>{selfieNumResults(results[SEARCH_TABS_MAP[index]])}</small>
                    : <Skeleton animation="wave" variant="text" sx={{ width: 60 }} />
                }
              </Tab>,
            )
          }
        </TabList>
        <br />
        <br />
        {
          SEARCH_TABS.map((_, section: number) => {
            const _type = SEARCH_TABS_MAP[section];
            return (
              <TabPanel value={section} key={section}>
                {
                  results[_type] !== undefined
                    ? (
                      results[_type]?.selfies.length === 0
                        ? (
                          <div className="grid place-items-center place-content-center h-[80vh]">
                            <span className="inline-block">(no {_type} results for <kbd>{searchQuery}</kbd>)</span>
                          </div>
                        )
                        : (
                          <SelfiesAsyncLoader
                            skip={results[_type]?.selfies.length ?? 0}
                            fetcher={
                              results[_type]?.more
                                ? handleSearch[_type]
                                : undefined
                            }
                          >
                            {
                              results[_type]?.selfies.map(s =>
                                s && <SelfieCard key={s.active_hash} selfie={s} />,
                              )
                            }
                          </SelfiesAsyncLoader>
                        )
                    )
                    : (
                      <div className="flex flex-col space-y-selfie">
                        <SelfieCardSkeleton />
                        <SelfieCardSkeleton />
                      </div>
                    )
                }
              </TabPanel>
            );
          },
          )
        }
      </Tabs>
    </>
  );
};
