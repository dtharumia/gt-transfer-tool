import React from 'react';

import Header from '../../components/header/header.component';

import { useLocation } from 'react-router-dom';

const Course = () => {
    const { state } = useLocation();
    const { course } = state;
    return <div className='course'>
        <Header />
        {course}
    </div>
}

export default Course;