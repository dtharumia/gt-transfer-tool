import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { connectHits } from "react-instantsearch-core";
import Entry from "./entry";


const SearchHits = ({ hits }) => {
  return (
    <SimpleGrid columns={4} spacing={5}>
      {hits.map((hit) => (
        <Entry key={hit.objectID} hit={hit} />
      ))}
    </SimpleGrid>
  );
};

export default connectHits(SearchHits);
