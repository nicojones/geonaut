import { Typography } from "@mui/joy";

import { StickyHeader } from "@/components/header";
import { ISearchResultType, IUrlParams } from "@/types";

import { SearchResults } from "./SearchResults";

export default async function SearchResultsPage ({ params, searchParams }: IUrlParams<"q", "type">): Promise<JSX.Element> {
  const searchQuery = decodeURIComponent(params.q);
  const searchType: ISearchResultType | undefined = searchParams.type as unknown as ISearchResultType;

  return (
    <div className="selfie-list">
      <StickyHeader
        sticky={false}
        header={
          <Typography level="h1" sx={{ textAlign: "center" }}>search results for <kbd>{searchQuery}</kbd></Typography>
        }
      />

      <SearchResults searchQuery={searchQuery} searchType={searchType} />
    </div>
  );
}
