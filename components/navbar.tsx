import { Link, Flex, Box, Text, Button, ButtonGroup } from "@chakra-ui/react";

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
        <Link href="/" color={"white"}>
          <Text>GT Transfer Tool</Text>
        </Link>
      </Flex>
      <Box>
        <ButtonGroup>
          <Button>
            Sign Up
          </Button>
          <Button>
            Sign In
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default Navbar;
