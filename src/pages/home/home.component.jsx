import React from 'react';
import { Container, Flex, Text, Stack } from '@chakra-ui/react';

import Header from '../../components/header/header.component';
import Filter from '../../components/filter/filter.component';

import HomeHeader from '../../components/home-header/home-header.component';
import { Image } from '@chakra-ui/react';

import ExampleSearches from '../../components/example-searches/example-searches.component';

const Home = () => {

    return (
        <Container maxWidth="container.xl" padding={0}>
            <Flex h="75vh" py={20}>
                <Stack
                    w="full"
                    h="full"
                    p={10}
                    spacing={10}
                    alignItems="flex-start"
                >
                    <HomeHeader />
                    <Filter />
                    <ExampleSearches />
                
            </Stack>
            <Stack
                w="full"
                h="full"
                p={10}
                spacing={10}
            >
                <Image src="/home/arrow.png"></Image>
            </Stack>
        </Flex>
        </Container >

    )

}

export default Home;