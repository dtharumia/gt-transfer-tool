import React from 'react';
import { useParams } from 'react-router-dom';
import CourseTable from '../../components/course-table/course-table';
import PageHeader from '../../components/page-header/page-header';
import { Container, Flex, Stack, VStack } from '@chakra-ui/react';

import Filter from '../../components/filter/filter';
import MainHeader from '../../components/main-header/main-header';

const Course = () => {

    const { course } = useParams();

    return (
        <Container maxWidth="container.xl" h="75vh" paddingBottom={20}>
            <VStack paddingBottom={10}>
                <MainHeader />
            </VStack>
            <VStack position={"relative"}>

                <Filter mt={50} />
            </VStack>
            <Flex h="100vh" py={5}>
                <Stack
                    w="full"
                    h="full"
                    p={5}
                    spacing={10}
                    alignItems="center"
                >
                    <PageHeader primary={course.replaceAll("_", " ")} />
                    <CourseTable course={course.replaceAll("_", " ")} />
                </Stack>
            </Flex>
        </Container>

    )
}


export default Course;
