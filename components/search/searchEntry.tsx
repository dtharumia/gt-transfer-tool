import { Box, Text, VStack, HStack, Link } from "@chakra-ui/react";

const SearchEntry = ({ hit }) => {
  return (
    <Box
      key={hit.objectID}
      padding={"2vh"}
      borderWidth="1px"
      borderRadius="lg"
      minWidth={"sm"}
      textAlign={"center"}
    >
      <>
        {hit.type == "gt_class" ? (
          <Link href={`/course/${hit.primary}`}>{hit.primary}</Link>
        ) : (
          <></>
        )}
        {hit.type == "transfer_school" ? (
          <Link href={`/school/${hit.primary}`}>{hit.primary}</Link>
        ) : (
          <></>
        )}
        {hit.type == "transfer_state" ? (
          <Link href={`/state/${hit.primary}`}>{hit.primary}</Link>
        ) : (
          <></>
        )}
      </>
    </Box>
  );
};

export default SearchEntry;
