import Image from "next/image";
import {
  Box,
  Heading,
  Highlight,
  HStack,
  Text,
} from "@chakra-ui/react";

import Navbar from "@/components/navbar";
import Search from "@/components/home/search";

export default function Home() {
  return (
    <Box>
      <Navbar></Navbar>
      <Box padding={"10vh"}>
        <Box>
          <Heading textAlign={"center"}>
            <Highlight
              query="Transfer Tool"
              styles={{ px: "2", py: "1", rounded: "full", bg: "#B3A369" }}
            >
              Georgia Tech Transfer Tool
            </Highlight>
          </Heading>
          <Text fontSize={"3xl"} textAlign={"center"}>
            GT Transfer Tool helps you find courses that transfer back to
            Georgia Tech.
          </Text>
          <Text fontSize={"3xl"} textAlign={"center"}>
            Search for courses and schools below.
          </Text>
          <Search></Search>
        </Box>
        <HStack style={{ justifyContent: "center" }}>
          <Image
            src="/images/arrow.png"
            width={500}
            height={500}
            alt="Transfer Arrow"
          />
          <Image src="/images/buzz.png" width={250} height={250} alt="Buzz" />
        </HStack>
      </Box>
    </Box>
  );
}
