import React from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Text, Spacer } from "@chakra-ui/react";



const FilterHit = ({ hit: { type, primary, secondary } }) => {
    const navigate = useNavigate();
    const filterSelect = (e) => {
        if (type === "gt_class") navigate(`/course/${primary}`)
        if (type === "transfer_school") navigate(`/school/${primary}`)
    }

    return (
        <Flex w="md" rounded={"md"} onClick={filterSelect} cursor={"pointer"} background={'#D6DBD4'}>
            <Text fontSize={"xl"}>{primary}</Text>
            <Spacer></Spacer>
            {secondary !== "" ? <Text fontSize={"xl"}>{secondary}</Text> : null}
        </Flex>
    )
}

export default FilterHit;
