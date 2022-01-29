import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';

import CourseHits from "../../components/course-hits/course-hits.component"
import { TYPESENSE_SERVER_CONFIG } from '../../typesenseAdapter';
import { InstantSearch } from 'react-instantsearch-dom';

import Typesense from 'typesense';


const Course = () => {
    const typesense = new Typesense.SearchClient(TYPESENSE_SERVER_CONFIG)
    const params = useParams()

    typesense.collections('transfers').documents().search({
        'q': `${params.course.replaceAll("_", " ")}`,
        'query_by': 'gt_number',
        'per_page': 250
    }).then(e => console.log(e.hits))


    return (
        ""
    )
}


export default Course;
!