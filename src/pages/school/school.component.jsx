import React from 'react';
import { useParams } from 'react-router-dom';
import SchoolTable from '../../components/school-table/school-table.component';
import Header from '../../components/header/header.component';
import { Container, Flex, Stack, VStack } from '@chakra-ui/react';
import Filter from '../../components/filter/filter.component';

const School = () => {

    const { school } = useParams();

    return (
        <Container maxWidth="container.xl" padding={0}>
            <VStack>
                <Filter />
            </VStack>
            <Flex h="100vh" py={5}>
                <Stack
                    w="full"
                    h="full"
                    p={5}
                    spacing={10}
                    alignItems="center"
                >
                    <Header primary={school.replaceAll("_", " ")} />
                    <SchoolTable school={school.replaceAll("_", " ")} />
                </Stack>
            </Flex>
        </Container>

    )
}


export default School;
