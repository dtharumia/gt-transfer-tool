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

import Table from "@/components/table";

type Course = {
  found: number;
  hits: Array<{
    objectID: string;
    document: {
      gt_class: string;
      gt_title: string;
      state: string;
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
      setCourses(res);
    });
  }, [courseName, page]);

  const onClickPrev = (e) => {
    setPage(page - 1);
  };
  const onClickNext = (e) => {
    setPage(page + 1);
  };

  return (
    courses.found > 0 ? (
    <Table
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      page={page}
      courses={courses}
      heading={courseName}
      subHeading={"gt_title"}
      ></Table>
    ) : <></>
  );
};

export default CoursePage;
