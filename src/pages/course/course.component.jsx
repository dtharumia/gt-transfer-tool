import React, { useEffect, useState } from 'react';

import Header from '../../components/header/header.component';

import { useParams } from 'react-router-dom';
import { filterTransferCourses } from '../../firebase/firebase_utils';

import CardList from '../../components/card-list/card-list.component';
import { searchClient } from '../../typesenseAdapter';
const Course = () => {
    const Typesense = require('typesense')

    let client = new Typesense.Client({
        'nodes': [{
            'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
            'port': '8108',      // For Typesense Cloud use 443
            'protocol': 'http'   // For Typesense Cloud use https
        }],
        'apiKey': 'xyz',
        'connectionTimeoutSeconds': 2
    })
    let searchParameters = {
        'q': 'ISYE 3770',
        "query_by": "gt_number"
    }

    client.collections('transfers')
        .documents()
        .search(searchParameters)
        .then(function (searchResults) {
            console.log(searchResults)
        })

    return (
        <div>
            COURSE
        </div>
    )

    // const param = useParams();
    // const { course } = param
    // const [getTransfer, setTransfer] = useState([]);

    // useEffect(() => {
    //     filterTransferCourses("gt_class", course.replaceAll("_", " "))
    //         .then(transfers => Object.values(transfers))
    //         .then(data => setTransfer(Object.values(data)))
    // }, [])

    // return (
    //     <div className='course'>
    //         <Header />
    //         <h2>
    //             {
    //                 getTransfer.length === 0 ? "" : `${getTransfer[0].gt_class} - ${getTransfer[0].gt_title}`
    //             }
    //         </h2>

    //         <CardList courses={getTransfer} type="transfer" />
    //     </div>
    // )
}


export default Course;
