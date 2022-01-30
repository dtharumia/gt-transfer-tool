import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Heading, HStack, } from '@chakra-ui/react';
const MainHeader = () => {
    const navigate = useNavigate()
    return (
        <HStack onClick={() => navigate("/")} cursor={"pointer"}>
            <Heading>Georgia Tech</Heading>
            <Heading variant={"gold-text"}>Transfer Tool</Heading>
        </HStack>
    )
}

export default MainHeader;