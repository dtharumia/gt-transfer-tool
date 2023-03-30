import { VStack } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import SearchEntry from "./searchEntry";

const SearchHits = ({ hits }) => {
  return (
    <VStack>
      {hits.map((hit) => (
        <SearchEntry key={hit.objectID} hit={hit} />
      ))}
    </VStack>
  );
};

export default connectHits(SearchHits);
