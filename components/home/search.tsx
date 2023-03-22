import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "../search/searchBox";
import { typesenseAdapter, searchClient } from "@/typesense/typesenseConfig";

import SearchHits from "../search/searchHits";

const Search = () => (
  <InstantSearch indexName="searches" searchClient={searchClient}>
    <SearchBox />
    <SearchHits />
  </InstantSearch>
);

export default Search;
