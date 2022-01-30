import React from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Text, Spacer } from "@chakra-ui/react";



const FilterHit = ({ hit: { type, primary, secondary } }) => {
    const navigate = useNavigate();
    const filterSelect = (e) => {
        if (type == "gt_class") navigate(`/course/${primary.replaceAll(" ", "_")}`)
        if (type == "transfer_school") navigate(`/school/${primary.replaceAll(" ", "_")}`)
    }

    return (
        <Flex w="md" onClick={filterSelect} cursor={"pointer"}>
            <Text >{primary}</Text>
            <Spacer></Spacer>
            {secondary != "null" ? <Text>{secondary}</Text> : null}
        </Flex>
    )
}

export default FilterHit;
