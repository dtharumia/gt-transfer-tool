import React, { useEffect } from 'react';
import { Container, Flex, Stack } from '@chakra-ui/react';

import Filter from '../../components/filter/filter';

import HomeHeader from '../../components/home-header/home-header';
import { Image } from '@chakra-ui/react';

import ExampleSearches from '../../components/example-searches/example-searches';

import Footer from "../../components/footer/footer"

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
            <Footer />
        </Container >

    )

}

export default Home;