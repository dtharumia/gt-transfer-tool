import Navbar from "@/components/navbar";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SchoolPage = () => {
  const router = useRouter();
  const { courseName } = router.query;
  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"10vh"}>
        <Heading textAlign={"center"}>{courseName}</Heading>
      </Box>
    </Box>
  );
};

export default SchoolPage;
