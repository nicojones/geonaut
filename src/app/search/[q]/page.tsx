import { Typography } from "@mui/joy";
import { Metadata } from "next";

import { StickyHeader } from "@/components/header";
import { ISearchResultType, IUrlParams } from "@/types";

import { SearchResults } from "./SearchResults";

export async function generateMetadata (
  { params, searchParams }: IUrlParams<"q", "type">,
): Promise<Metadata> {
  return {
    title: `search results for ${params.q} - geonaut`,
    description: `displaying the ${searchParams.type ? searchParams.type + " " : ""}search results for query ${params.q}`,
  };
}

export default async function SearchResultsPage ({ params, searchParams }: IUrlParams<"q", "type">): Promise<JSX.Element> {
  const searchQuery = decodeURIComponent(params.q);
  const searchType: ISearchResultType | undefined = searchParams.type as unknown as ISearchResultType;

  return (
    <div className="selfie-list">
      <StickyHeader
        sticky={false}
        header={<>search results for <kbd>{searchQuery}</kbd></>}
      />

      <SearchResults searchQuery={searchQuery} searchType={searchType} />
    </div>
  );
}
