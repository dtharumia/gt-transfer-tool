import React from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Text, Spacer } from "@chakra-ui/react";



const FilterHit = ({ hit: { number, school, state } }) => {
    const navigate = useNavigate();
    const filterSelect = (e) => {
        if(number) navigate(`course/${e.target.innerText.replaceAll(" ", "_")}`)
        if(school) navigate(`school/${e.target.innerText.replaceAll(" ", "_")}`)
        console.log(e.target.innerText)
    }

    return (
        <Flex w="sm">
            <Text onClick={filterSelect}>{number || school}</Text>
            <Spacer></Spacer>
            <Text>{state}</Text>
        </Flex>
    )
}

export default FilterHit;
