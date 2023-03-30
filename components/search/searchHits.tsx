import { Center, SimpleGrid } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import SearchEntry from "./searchEntry";

const SearchHits = ({ hits }) => {
  return (
    <SimpleGrid columns={2} width='xl' spacingX={'2'}>
      {hits.map((hit) => (
        <SearchEntry key={hit.objectID} hit={hit} />
      ))}
    </SimpleGrid>
  );
};

export default connectHits(SearchHits);
