import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "../search/searchBox";
import { searchClient } from "@/typesense/typesenseSearchConfig";

import SearchHits from "../search/searchHits";
import { VStack } from "@chakra-ui/react";

const Search = () => (
  <InstantSearch indexName="searches" searchClient={searchClient}>
    <VStack>
      <SearchBox />
      <SearchHits />
    </VStack>
  </InstantSearch>
);

export default Search;
