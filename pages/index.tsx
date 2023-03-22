import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Heading,
  Highlight,
  HStack,
  Input,
  List,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import Navbar from "@/components/home/navbar";

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
            Georgia Tech. Search for courses and schools below.
          </Text>
          <Input placeholder="Search for courses and schools"></Input>
          {/* <Text>Example Searches:</Text>
          <UnorderedList>
            <ListItem>PSYC 1101</ListItem>
            <ListItem>English Composition I</ListItem>
            <ListItem>Georgia State University</ListItem>
          </UnorderedList> */}
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
