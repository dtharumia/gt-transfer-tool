import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header.component';

import { useLocation } from 'react-router-dom';
import { readCourseFromDatabase } from '../../firebase/firebase_utils';

import CardList from '../../components/card-list/card-list.component';

const Course = () => {
    const location = useLocation();

    const [getTransferCourses, setTransferCourses] = useState([]);
    const [getCourse] = useState(location.state.course)

    useEffect(() => {
        readCourseFromDatabase(getCourse)
            .then(transfers => Object.values(transfers))
            .then(data => setTransferCourses(Object.values(data)))


    }, [])

    return (
        <div className='course'>
            <Header />
            <CardList courses={getTransferCourses} type="transfer"/>
        </div>
    )
}


export default Course;
