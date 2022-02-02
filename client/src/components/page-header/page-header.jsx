import React from 'react';
import { Box, VStack} from '@chakra-ui/react'
import MainHeader from '../main-header/main-header';
import Filter from '../filter/filter';

const PageHeader = () => (
    <Box paddingBottom={10}>
        <VStack paddingBottom={10}>
            <MainHeader />
        </VStack>
        <VStack position={"relative"}>
            <Filter mt={50} />
        </VStack>
    </Box>
)

export default PageHeader;