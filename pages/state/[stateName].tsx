import Navbar from "@/components/navbar";
import { searchTypesense } from "@/typesense/typesenseSearch";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const StatePage = () => {
  const router = useRouter();
  const { stateName } = router.query;
  const [page, setPage] = useState(1);
  const [schools, setSchools] = useState({});
  useEffect(() => {
    if (!stateName) {
      return;
    }
    searchTypesense(
      "searches",
      stateName,
      "secondary",
      page,
      "primary:asc"
    ).then((res) => {
      setSchools(res);
    });
  }, [stateName, page]);

  const onClickPrev = (e) => {
    setPage(page - 1);
  };
  const onClickNext = (e) => {
    setPage(page + 1);
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"5vh"}>
        <VStack>
          <Heading textAlign={"center"}>{stateName}</Heading>
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
              isDisabled={page * 20 >= schools.found}
            >
              Next ▶
            </Button>
          </ButtonGroup>
        </HStack>
        <SimpleGrid columns={4} spacing={5}>
          {Object.keys(schools).length > 0 &&
            schools.hits.map((hit) => {
              const doc = hit.document;
              return (
                <Box
                  key={hit.objectID}
                  padding={"2vh"}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Link href={`/school/${doc.primary}`}>{doc.primary}</Link>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default StatePage;
