import React from 'react';
import { useParams } from 'react-router-dom';
import CourseTable from '../../components/course-table/course-table.component';
import Header from '../../components/header/header.component';
import { Container, Flex, Stack } from '@chakra-ui/react';

const Course = () => {

    const { course } = useParams();

    return (
        <Container maxWidth="container.xl" padding={0}>

            <Flex h="100vh" py={5}>
                <Stack
                    w="full"
                    h="full"
                    p={5}
                    spacing={10}
                    alignItems="center"
                >
                    <Header primary={course.replaceAll("_", " ")} />
                    <CourseTable course={course.replaceAll("_", " ")} />
                </Stack>
            </Flex>
        </Container>

    )
}


export default Course;
