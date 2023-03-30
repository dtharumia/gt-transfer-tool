import {
  Box,
  Center,
  Heading,
  Highlight,
  HStack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import Search from "@/components/home/search";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"10vh"}>
        <Heading textAlign={"center"} pb={5}>
          <Highlight
            query="Transfer Tool"
            styles={{ px: "2", py: "1", rounded: "full", bg: "#B3A369" }}
          >
            Georgia Tech Transfer Tool
          </Highlight>
        </Heading>
        <Text fontSize={"2xl"} textAlign={"center"} pb={5}>
          GT Transfer Tool helps you find courses that transfer back to Georgia
          Tech.
        </Text>
        <Text fontSize={"2xl"} textAlign={"center"} pb={5}>
          Search for courses and schools below.
        </Text>
        <Center>
          <Search></Search>
        </Center>
      </Box>
      <HStack
        spacing="20px"
        flexDirection={["column", "row"]}
        wrap="wrap"
        align={"center"}
        justify={"center"}
      >
        <Image
          src="/images/arrow.png"
          width={500}
          height={500}
          alt="Transfer Arrow"
        />
        <Image src="/images/buzz.png" width={250} height={250} alt="Buzz" />
      </HStack>
    </Box>
  );
}
