import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import { typesenseAdapter } from "@/typesense/typesenseConfig";
const searchClient = typesenseAdapter.searchClient;

import SearchHits from "../search/searchHits";

const Search = () => (
  <InstantSearch indexName="transfers" searchClient={searchClient}>
    <SearchBox />
    <SearchHits />
  </InstantSearch>
);

export default Search;
