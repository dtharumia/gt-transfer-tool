import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import SearchEntry from "./searchEntry";


const SearchHits = ({ hits }) => {
  return (
    <SimpleGrid columns={4} spacing={5} justifyItems={"center"}>
      {hits.map((hit) => (
        <SearchEntry key={hit.objectID} hit={hit} />
      ))}
    </SimpleGrid>
  );
};

export default connectHits(SearchHits);
