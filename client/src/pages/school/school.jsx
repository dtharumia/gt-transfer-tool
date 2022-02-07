import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SchoolGrid from '../../components/school-grid/school-grid';
import PageHeader from '../../components/page-header/page-header';
import { Container, Heading } from '@chakra-ui/react';


const School = () => {

    const { school } = useParams();
    const [getSchoolData, setSchoolData] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3001/api/read/transfer_school/${school}`)
            .then(response => response.json())
            .then(data => setSchoolData(data));
    }, [school])


    return (
        <Container maxWidth="container.xl" position={"relative"} py={20}>
            <PageHeader />
            <Heading pb={10} textAlign={"center"} as='h3' size='lg'>{school}</Heading>
            <SchoolGrid school={getSchoolData} />

        </Container>

    )
}


export default School;
