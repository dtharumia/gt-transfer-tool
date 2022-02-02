import React from 'react';
import { Box, VStack, HStack, Heading } from '@chakra-ui/react'
import Filter from '../filter/filter';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
    const navigate = useNavigate()
    return <Box paddingBottom={10}>
        <VStack paddingBottom={10}>
            <HStack onClick={() => navigate("/")} cursor={"pointer"}>
                <Heading>
                    <Box display={'inline'}>Georgia Tech </Box>
                    <Box display={'inline'} color={'#A4925A'}>Transfer Tool</Box>
                </Heading>
            </HStack>
        </VStack>
        <VStack position={"relative"}>
            <Filter mt={50} />
        </VStack>
    </Box>
}

export default PageHeader;