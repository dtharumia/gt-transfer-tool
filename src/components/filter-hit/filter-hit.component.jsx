import React from "react";

import { Flex, Text,Spacer } from "@chakra-ui/react";

const FilterHit = ({ hit: { number, school, state } }) => {
    return (
        <Flex w="sm">
            <Text>{number || school}</Text>
            <Spacer></Spacer>
            <Text>{state}</Text>
        </Flex>
    )
}

export default FilterHit;
