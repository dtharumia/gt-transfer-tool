import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header.component';

import { useParams } from 'react-router-dom';
import { getTransferCourses } from '../../firebase/firebase_utils';

import CardList from '../../components/card-list/card-list.component';

const Course = () => {
    const param = useParams();
    const { course } = param
    const [getTransfer, setTransfer] = useState([]);

    useEffect(() => {
        getTransferCourses(course.replace("_", " "))
            .then(transfers => Object.values(transfers))
            .then(data => setTransfer(Object.values(data)))
    }, [])

    return (
        <div className='course'>
            <Header />
            {/* <h2>{getTransferCourses[0].gt_class} - {getTransferCourses[0].gt_title}</h2> */}
            <h2>
                {
                    getTransfer.length === 0 ? "" : `${getTransfer[0].gt_class} - ${getTransfer[0].gt_title}`
                }
            </h2>

            <CardList courses={getTransfer} type="transfer" />
        </div>
    )
}


export default Course;
