import React, { useState, useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    VStack,
    Container,
} from '@chakra-ui/react'

import { filterTransferCourses } from '../../firebase/firebase_utils';


const SchoolTable = ({ school }) => {


    const [getSchoolData, setSchoolData] = useState({});

    useEffect(() => (
        filterTransferCourses("transfer_school", school).then(data => {
            setSchoolData(data)
        })
    ), [])


    return (
        <Table>
            <Thead>
                <Tr>
                    <Th textAlign={"center"}>GT Class</Th>
                    <Th textAlign={"center"}>Transfer Class</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Object.entries(getSchoolData).map(school => {
                    return <Tr key={school[0]}>
                        <Td textAlign={"center"}>{school[1]["gt_class"]}</Td>
                        <Td textAlign={"center"}>{school[1]["transfer_class"]}</Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    )
}

export default SchoolTable