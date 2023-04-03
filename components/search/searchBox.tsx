import { Box, Flex, Input } from "@chakra-ui/react";
import { connectSearchBox } from "react-instantsearch-dom";
import { haveSearchHits } from "../stateManagement";

const SearchBox = ({ refine }) => {
  const onChange = (event) => {
    refine(event.currentTarget.value);
    if (event.currentTarget.value.length > 0) {
      haveSearchHits.set(true);
    } else {
      haveSearchHits.set(false);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box pt={"2vh"} pb={"2vh"}>
        <form noValidate action="" role="search">
          <Input
            id="filter-search"
            type="search"
            placeholder="Search for GT Class, Transfer School, or State"
            w={["sm", "md"]}
            onChange={onChange}
          />
        </form>
      </Box>
    </Flex>
  );
};

export default connectSearchBox(SearchBox);
