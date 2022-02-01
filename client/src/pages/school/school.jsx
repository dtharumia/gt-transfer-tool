import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SchoolGrid from '../../components/school-grid/school-grid';
import PageHeader from '../../components/page-header/page-header';
import { Container, Flex, Stack, VStack } from '@chakra-ui/react';
import Filter from '../../components/filter/filter';
import MainHeader from '../../components/main-header/main-header';

import { filterTransferCourses } from '../../firebase/firebase_utils';

const School = () => {

    const { school } = useParams();
    const [getSchoolData, setSchoolData] = useState("")
    useEffect(() => {
        filterTransferCourses("transfer_school", school)
            .then(data => setSchoolData(data))
    }, [])


    return (
        <Container maxWidth="container.xl" position={"relative"} >
            <VStack paddingBottom={10}>
                <MainHeader />
                <Filter mt={50} />
            </VStack>
            <SchoolGrid school={getSchoolData} />
        </Container>

    )
}


export default School;
