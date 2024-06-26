import Navbar from "@/components/navbar/navbar";
import TableHeader from "@/components/table/tableHeader";
import { searchTypesense } from "@/typesense/typesenseSearch";
import { Box, Center, Link, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type School = {
  found: number;
  hits: Array<{
    objectID: string;
    document: {
      primary: string;
    };
  }>;
};

const StatePage = () => {
  const router = useRouter();
  const { stateName } = router.query;
  const [page, setPage] = useState(1);
  const [schools, setSchools] = useState<School>({
    found: 0,
    hits: [
      {
        objectID: "",
        document: {
          primary: "",
        },
      },
    ],
  });

  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!stateName) {
      return;
    }
    searchTypesense(
      "searches",
      stateName,
      "secondary",
      page,
      "primary:asc",
      18
    ).then((res) => {
      setSchools(res as any);
    });
  }, [stateName, page]);

  return (
    <Box>
      <Head>
        <title>{stateName} | GT Transfer Tool</title>
        <meta
          name="description"
          content={`Transfers from ${stateName} to Georgia Tech`}
        />
      </Head>
      <Navbar></Navbar>
      <TableHeader
        total={schools.found}
        heading={stateName}
        subHeading={""}
        page={page}
        setPage={setPage}
      />
      <Center>
        <SimpleGrid columns={isSmallerScreen ? 2 : 3} spacing={5}>
          {schools.found > 0 &&
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
      </Center>
    </Box>
  );
};

export default StatePage;
