import React from 'react';
import { Container, Flex, Text, Stack } from '@chakra-ui/react';

import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';

import HomeHeader from '../../components/home-header/home-header';
import { Image } from '@chakra-ui/react';

import ExampleSearches from '../../components/example-searches/example-searches';

const Home = () => {

    return (
        <Container maxWidth="container.xl" position={"relative"}>
            <Flex h="75vh" py={20} >
                <Stack
                    w="full"
                    p={10}
                    spacing={5}
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