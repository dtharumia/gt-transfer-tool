import { Flex, Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg="#B3A369"
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Link href="/" color={"white"} fontWeight="bold" fontSize={"2xl"}>
          GT Transfer Tool
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
