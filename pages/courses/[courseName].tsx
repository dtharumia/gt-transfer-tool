import Navbar from "@/components/navbar";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { searchTransfers } from "@/typesense/typesenseSearch";
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
    searchTransfers(courseName, "gt_class", page, "transfer_school:asc").then(
      (res) => {
        console.log(res);
        setCourses(res);
      }
    );
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
          <Text>{courses.hits[0].document.gt_title}</Text>
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
        <SimpleGrid columns={4} spacing={5}>
          {Object.keys(courses).length > 0 &&
            courses.hits.map((hit) => {
              const doc = hit.document;
              return (
                <Box
                  key={hit.objectID}
                  padding={"2vh"}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <VStack>
                    <HStack>
                      <Text>{doc.transfer_class}</Text>
                      <Text>{doc.transfer_title}</Text>
                    </HStack>
                    <HStack>
                      <Text>{doc.transfer_school}</Text>
                      <Text>{doc.state}</Text>
                    </HStack>
                  </VStack>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CoursePage;
