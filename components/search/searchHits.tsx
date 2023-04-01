import { VStack } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import SearchEntry from "./searchEntry";

import { useEffect } from "react";
import { entity } from "simpler-state";

export const haveSearchHits = entity(false);

const SearchHits = ({ hits }) => {
  useEffect(() => {
    if (hits.length > 0) {
      haveSearchHits.set(true);
    } else {
      haveSearchHits.set(false);
    }
  }, [hits]);
  return (
    <VStack>
      {hits.map((hit) => (
        <SearchEntry key={hit.objectID} hit={hit} />
      ))}
    </VStack>
  );
};

export default connectHits(SearchHits);
