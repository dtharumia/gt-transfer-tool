import { connectSearchBox } from "react-instantsearch-dom";
import { Box, Flex, Input } from "@chakra-ui/react";

const SearchBox = ({ refine }) => (
  <Flex justifyContent="center" alignItems="center">
    <Box pt={"2vh"} pb={"2vh"}>
      <form noValidate action="" role="search">
        <Input
          id="filter-search"
          type="search"
          placeholder="Search for GT Class, Transfer School, or State"
          w="2xl"
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </form>
    </Box>
  </Flex>
);

export default connectSearchBox(SearchBox);
