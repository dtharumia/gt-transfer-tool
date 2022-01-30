import React from 'react';
import { Container, Flex, HStack, Stack } from '@chakra-ui/react';

import PageHeader from '../../components/page-header/page-header';
import Filter from '../../components/filter/filter';

import HomeHeader from '../../components/home-header/home-header';
import { Image } from '@chakra-ui/react';

import ExampleSearches from '../../components/example-searches/example-searches';
import MainHeader from '../../components/main-header/main-header';

import Footer from '../../components/footer/footer';
const Home = () => {

    return (
        <Container maxWidth="container.xl" position={"relative"} >
            <Flex h="75vh" py={20} >
                <Stack
                    w="full"
                    p={10}
                    spacing={5}
                >
                    <HomeHeader />
                    <Filter mt={125} />
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