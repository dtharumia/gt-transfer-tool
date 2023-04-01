import { Button, Flex, Link } from "@chakra-ui/react";
import { useEffect } from "react";

import { setSavedCourses } from "../state";

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
      <Button colorScheme={'facebook'}>
        <Link href="/saved-courses" >
          Saved Courses
        </Link>
      </Button>
    </Flex>
  );
};

export default Navbar;
