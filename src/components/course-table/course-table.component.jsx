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


const CourseTable = ({course}) => {


    const [getCourseData, setCourseData] = useState({});

    useEffect(() => (
        filterTransferCourses("gt_class", course).then(data => {
            setCourseData(data)
        })
    ), [])


    return <Table>
        <Thead>
            <Tr>
                <Th>State</Th>
                <Th>School</Th>
                <Th>Transfer Class</Th>
            </Tr>
        </Thead>
        <Tbody>
            {Object.entries(getCourseData).map(course => {
                return <Tr key={course[0]}>
                    <Td>{course[1]["state"]}</Td>
                    <Td>{course[1]["transfer_school"]}</Td>
                    <Td>{course[1]["transfer_class"]}</Td>
                </Tr>
            })}
        </Tbody>
    </Table>
}

export default CourseTable