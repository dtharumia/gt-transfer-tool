import { Box, Text, VStack, HStack, Link } from "@chakra-ui/react";

const SearchEntry = ({ hit }) => {
  console.log(hit);
  return (
    <Box
      key={hit.objectID}
      padding={"2vh"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <HStack>
        <Link href={"/courses/" + hit.entry}>{hit.entry}</Link>
      </HStack>
    </Box>
  );
};

export default SearchEntry;