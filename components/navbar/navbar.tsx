import { Box, Button, Flex, IconButton, Link } from "@chakra-ui/react";
import { useEffect } from "react";
import { setSavedCourses } from "../state";

import { AiFillGithub } from "react-icons/ai";

const Navbar = () => {
  useEffect(() => {
    const savedCourses = localStorage.getItem("savedCourses");
    if (savedCourses) {
      setSavedCourses(JSON.parse(savedCourses));
    }
  }, []);

  return (
    <Flex
      bg="#B3A369"
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/" color={"white"} fontWeight="bold" fontSize={"2xl"}>
        GT Transfer Tool
      </Link>
      <Box>
        <Button colorScheme={"facebook"} marginRight={"1em"}>
          <Link href="/saved-courses">Saved Courses</Link>
        </Button>
        <IconButton
          onClick={() => window.location.replace('https://github.com/dtharumia/gt-transfer-tool')}
          aria-label={"github"}
          icon={<AiFillGithub size={"25"} />}
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
