import React from 'react';
import { Container, Flex, VStack, Stack } from '@chakra-ui/react';

import Header from '../../components/header/header.component';
import Filter from '../../components/filter/filter.component';

const Home = () => {

    return (
        <Container maxWidth="container.xl" padding={0}>
            <Flex h="100vh" py={20}>
                <Stack
                    w="full"
                    h="full"
                    p={10}
                    spacing={10}
                    alignItems="flex-start"
                >
                    <Header primary={"Georgia Tech Transfer Tool"}/>
                    <Filter />
                </Stack>
                <Stack
                    w="full"
                    h="full"
                    p={10}
                    spacing={10}
                    bg="gray.50"
                ></Stack>
            </Flex>
        </Container>

    )

}

export default Home;