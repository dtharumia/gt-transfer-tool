import { VStack } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import SearchEntry from "./searchEntry";

import { entity } from "simpler-state";

export const haveSearchHits = entity(false);

const SearchHits = ({ hits }) => {
  haveSearchHits.set(hits.length > 0);
  return (
    <VStack>
      {hits.map((hit) => (
        <SearchEntry key={hit.objectID} hit={hit} />
      ))}
    </VStack>
  );
};

export default connectHits(SearchHits);
