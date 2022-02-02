import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/page-header/page-header';
import { Container, Heading } from '@chakra-ui/react';
import CourseGrid from '../../components/course-grid/course-grid';
import { filterTransferCourses } from '../../firebase/firebase_utils';
import Footer from '../../components/footer/footer';

const Course = () => {

    const { course } = useParams();
    const [getCourseData, setCourseData] = useState("")


    useEffect(() => {
        filterTransferCourses("gt_class", course)
            .then(data => setCourseData(data))
    }, [course])

    return (
        <Container maxWidth="container.xl" position={"relative"} py={20}>
            <PageHeader />
            <Heading pb={10} textAlign={"center"} as='h3' size='lg'>{course}</Heading>
            <CourseGrid course={getCourseData} />
        </Container>

    )
}


export default Course;
