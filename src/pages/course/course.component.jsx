import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header.component';

import { useParams } from 'react-router-dom';
import { readCourseFromDatabase } from '../../firebase/firebase_utils';

import CardList from '../../components/card-list/card-list.component';

const Course = () => {
    const param = useParams();
    const { course } = param
    const [getTransferCourses, setTransferCourses] = useState([]);

    useEffect(() => {
        readCourseFromDatabase(course)
            .then(transfers => Object.values(transfers))
            .then(data => setTransferCourses(Object.values(data)))
    }, [])

    return (
        <div className='course'>
            <Header />
            {/* <h2>{getTransferCourses[0].gt_class} - {getTransferCourses[0].gt_title}</h2> */}
            <h2>
                {
                    getTransferCourses.length == 0 ? "" : `${getTransferCourses[0].gt_class} - ${getTransferCourses[0].gt_title}`
                }
            </h2>

            <CardList courses={getTransferCourses} type="transfer" />
        </div>
    )
}


export default Course;
