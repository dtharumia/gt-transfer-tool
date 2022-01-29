import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header.component';

import { useParams } from 'react-router-dom';
import { filterTransferCourses } from '../../firebase/firebase_utils';

import CardList from '../../components/card-list/card-list.component';

const School = () => {
    return(
        <div>SCHOOL</div>
    )
    // const param = useParams();
    // const { school } = param
    // const [getSchoolCourses, setSchoolCourses] = useState([]);

    // useEffect(() => {
    //     filterTransferCourses("t_school", school.replaceAll("_", " "))
    //         .then(schools => Object.values(schools))
    //         .then(data => setSchoolCourses(Object.values(data)))
    // }, [])

    // return (
    //     <div className='course'>
    //         <Header />
    //         {/* <h2>{getTransferCourses[0].gt_class} - {getTransferCourses[0].gt_title}</h2> */}
    //         <h2>
    //             {
    //                 getSchoolCourses.length === 0 ? "" : getSchoolCourses[0].t_school
    //             }
    //         </h2>
    //         <CardList courses={getSchoolCourses} type="school" />
    //     </div>
    // )
}


export default School;
