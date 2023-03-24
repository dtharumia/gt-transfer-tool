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
  Text,
  Table as ChakraTable,
  Center,
} from "@chakra-ui/react";
import Navbar from "./navbar";

const Table = ({
  heading,
  subHeading,
  courses,
  onClickPrev,
  onClickNext,
  page,
}) => {
  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"5vh"}>
        <VStack>
          <Heading textAlign={"center"}>{heading}</Heading>
          <Text>{courses.hits[0].document[subHeading]}</Text>
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
        <Center>
          <TableContainer>
            <ChakraTable variant="striped" layout="fixed" maxW={"6xl"}>
              <Thead>
                <Tr>
                  {subHeading === "gt_title" ? (
                    <>
                      <Th width="10%" textAlign={"center"}>
                        Transfer State
                      </Th>
                      <Th width="40%" textAlign={"center"}>
                        Transfer School
                      </Th>
                      <Th width="10%" textAlign={"center"}>
                        Transfer Class
                      </Th>
                      <Th width="40%" textAlign={"center"}>
                        Transfer Title
                      </Th>
                    </>
                  ) : (
                    <>
                      <Th width="10%" textAlign={"center"}>
                        Transfer Class
                      </Th>
                      <Th width="23%" textAlign={"center"}>
                        Transfer Title
                      </Th>
                      <Th width="10%" textAlign={"center"}>
                        GT Class
                      </Th>
                      <Th width="23%" textAlign={"center"}>
                        GT Title
                      </Th>
                    </>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(courses).length > 0 &&
                  courses.hits.map((hit) => {
                    const doc = hit.document;
                    return (
                      <Tr key={hit.objectID}>
                        {subHeading === "gt_title" ? (
                          <>
                            <Td textAlign={"center"}>{doc.transfer_state}</Td>
                            <Td textAlign={"center"}>{doc.transfer_school}</Td>
                            <Td textAlign={"center"}>{doc.transfer_class}</Td>
                            <Td textAlign={"center"}>{doc.transfer_title}</Td>
                          </>
                        ) : (
                          <>
                            <Td textAlign={"center"}>{doc.transfer_class}</Td>
                            <Td textAlign={"center"}>{doc.transfer_title}</Td>
                            <Td textAlign={"center"}>{doc.gt_class}</Td>
                            <Td textAlign={"center"}>{doc.gt_title}</Td>
                          </>
                        )}
                      </Tr>
                    );
                  })}
              </Tbody>
            </ChakraTable>
          </TableContainer>
        </Center>
      </Box>
    </Box>
  );
};

export default Table;
