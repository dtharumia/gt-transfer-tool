import React, {useState, useEffect} from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'

import { filterTransferCourses } from '../../firebase/firebase_utils';


const SchoolTable = ({school}) => {


    const [getSchoolData, setSchoolData] = useState({});

    useEffect(() => (
        filterTransferCourses("transfer_school", school).then(data => {
            setSchoolData(data)
        })
    ), [])


    return <Table>
        <Thead>
            <Tr>
                <Th>Transfer Class</Th>
                <Th>GT Class</Th>
            </Tr>
        </Thead>
        <Tbody>
            {Object.entries(getSchoolData).map(school => {
                return <Tr key={school[0]}>
                    <Td>{school[1]["transfer_class"]}</Td>
                    <Td>{school[1]["gt_class"]}</Td>
                </Tr>
            })}
        </Tbody>
    </Table>
}

export default SchoolTable