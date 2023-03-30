import Navbar from "@/components/navbar";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
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

import Table from "@/components/table/table";
import TableHeader from "@/components/table/tableHeader";

type Course = {
  found: number;
  hits: Array<{
    objectID: string;
    document: {
      gt_class: string;
      gt_title: string;
      transfer_state: string;
      transfer_school: string;
      transfer_class: string;
      transfer_title: string;
    };
  }>;
};

const CoursePage = () => {
  const router = useRouter();
  const { courseName } = router.query;
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<Course>({
    found: 0,
    hits: [
      {
        objectID: "",
        document: {
          gt_class: "",
          gt_title: "",
          transfer_state: "",
          transfer_school: "",
          transfer_class: "",
          transfer_title: "",
        },
      },
    ],
  });
  useEffect(() => {
    if (!courseName) {
      return;
    }
    searchTypesense(
      "transfers",
      courseName,
      "gt_class",
      page,
      "transfer_state:asc, transfer_school:asc, transfer_class:asc"
    ).then((res) => {
      setCourses(res as any);
    });
  }, [courseName, page]);

  return courses.found > 0 ? (
    <Box>
      <Navbar></Navbar>
      <TableHeader
        total={courses.found}
        heading={courseName}
        subHeading={courses.hits[0].document["gt_title"]}
        page={page}
        setPage={setPage}
      />
      <Table
        courses={courses}
        columns={[
          {
            accessorKey: "transfer_state",
            header: "Transfer State",
          },
          {
            accessorKey: "transfer_school",
            header: "Transfer School",
          },
          {
            accessorKey: "transfer_class",
            header: "Transfer Class",
          },
          {
            accessorKey: "transfer_title",
            header: "Transfer Title",
          },
        ]}
      ></Table>
    </Box>
  ) : (
    <></>
  );
};

export default CoursePage;
