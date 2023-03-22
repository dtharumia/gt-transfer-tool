import {
  VStack,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
  Td,
  Table as ChakraTable,
} from "@chakra-ui/react";
import Navbar from "./navbar";

const Table = ({ heading, courses, onClickPrev, onClickNext, page }) => {
  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"5vh"}>
        <VStack>
          <Heading textAlign={"center"}>{heading}</Heading>
        </VStack>
        <HStack
          spacing={4}
          align="center"
          justify="center"
          pt={"2vh"}
          pb={"2vh"}
        >
          <ButtonGroup>
            <Button onClick={onClickPrev} isDisabled={page <= 1}>
              ◀ Prev
            </Button>
            <Button disabled>Page {page}</Button>
            <Button
              onClick={onClickNext}
              isDisabled={page * 20 >= courses.found}
            >
              Next ▶
            </Button>
          </ButtonGroup>
        </HStack>
        <TableContainer>
          <ChakraTable variant="striped" layout="fixed">
            <Thead>
              <Tr>
                <Th width="10%" textAlign={"center"}>
                  GT Class
                </Th>
                <Th width="23%" textAlign={"center"}>
                  GT Title
                </Th>
                <Th width="10%" textAlign={"center"}>
                  Transfer State
                </Th>
                <Th width="23%" textAlign={"center"}>
                  Transfer School
                </Th>
                <Th width="10%" textAlign={"center"}>
                  Transfer Class
                </Th>
                <Th width="23%" textAlign={"center"}>
                  Transfer Title
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(courses).length > 0 &&
                courses.hits.map((hit) => {
                  const doc = hit.document;
                  return (
                    <Tr key={hit.objectID}>
                      <Td textAlign={"center"}>{doc.gt_class}</Td>
                      <Td textAlign={"center"}>{doc.gt_title}</Td>
                      <Td textAlign={"center"}>{doc.state}</Td>
                      <Td textAlign={"center"}>{doc.transfer_school}</Td>
                      <Td textAlign={"center"}>{doc.transfer_class}</Td>
                      <Td textAlign={"center"}>{doc.transfer_title}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </ChakraTable>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Table;
