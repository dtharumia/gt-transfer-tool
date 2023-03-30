import { searchClient } from "@/typesense/typesenseSearchConfig";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "../search/searchBox";

import { VStack } from "@chakra-ui/react";
import SearchHits from "../search/searchHits";

const Search = () => (
  <InstantSearch indexName="searches" searchClient={searchClient}>
    <VStack>
      <SearchBox />
      <SearchHits />
    </VStack>
  </InstantSearch>
);

export default Search;
