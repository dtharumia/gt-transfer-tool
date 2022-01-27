import React, { useState } from 'react';
import { Container, Flex, VStack, HStack } from '@chakra-ui/react';
import { filterGTCourses } from '../../firebase/firebase_utils';

import Header from '../../components/header/header.component';
import SearchBox from '../../components/search-box/search-box.component'
import CardList from '../../components/card-list/card-list.component'
import Filter from '../../components/filter/filter.component';

const Home = () => {
    const [getGTCourses, setGTCourses] = useState("");

    const onSearchChange = async event => {
        setGTCourses(await filterGTCourses(event.target.value.toUpperCase()))
    }

    return (
        <Container maxWidth="container.xl" padding={0}>
            <Flex h="100vh" py={20}>
                <VStack
                    w="full"
                    h="full"
                    p={10}
                    spacing={10}
                    alignItems="flex-start"
                >
                    <Header />
                    <Filter />
                </VStack>
                <VStack
                    w="full"
                    h="full"
                    p={10}
                    spacing={10}
                    bg="gray.50"
                ></VStack>
            </Flex>

        </Container>

    )

}

export default Home;