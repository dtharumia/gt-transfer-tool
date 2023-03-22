import Navbar from "@/components/navbar";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
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
    
    const onButtonClick = (e) => {
        setPage(page + 1);
    }

  return (
    <Box>
      <Navbar></Navbar>
      <Button onClick={onButtonClick}>Next Page</Button>
      <Box padding={"10vh"}>
        <Heading textAlign={"center"}>{courseName}</Heading>
        {Object.keys(courses).length > 0 &&
          courses.hits.map((hit) => {
            const doc = hit.document;
            return (
              <Text>
                {doc.transfer_school} {doc.transfer_class}
              </Text>
            );
          })}
      </Box>
    </Box>
  );
};

export default CoursePage;
