import Navbar from "@/components/navbar";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { searchTypesense } from "@/typesense/typesenseSearch";
import { useEffect, useState } from "react";

const CoursePage = () => {
  const router = useRouter();
  const { courseName } = router.query;
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState({});
  useEffect(() => {
    if (!courseName) {
      return;
    }
    searchTypesense(
      "transfers",
      courseName,
      "gt_class",
      page,
      "state:asc"
    ).then((res) => {
      console.log(res);
      setCourses(res);
    });
  }, [courseName, page]);

  const onClickPrev = (e) => {
    setPage(page - 1);
  };
  const onClickNext = (e) => {
    setPage(page + 1);
  };

  const hasNext = () => {
    return page * 20 < courses.hits;
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"5vh"}>
        <VStack>
          <Heading textAlign={"center"}>{courseName}</Heading>
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
          <Table variant="striped" layout="fixed">
            <Thead>
              <Tr>
                <Th width="10%">GT Class</Th>
                <Th width="20%">GT Title</Th>
                <Th width="15%">Transfer State</Th>
                <Th width="20%">Transfer School</Th>
                <Th width="15%">Transfer Class</Th>
                <Th width="20%">Transfer Title</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(courses).length > 0 &&
                courses.hits.map((hit) => {
                  const doc = hit.document;
                  return (
                    <Tr>
                      <Td>{courseName}</Td>
                      <Td>{doc.gt_title}</Td>
                      <Td>{doc.state}</Td>
                      <Td>{doc.transfer_school}</Td>
                      <Td>{doc.transfer_class}</Td>
                      <Td>{doc.transfer_title}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CoursePage;
