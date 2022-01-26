import React, { useState } from 'react';

import './home.styles.scss'
import { filterGTCourses } from '../../firebase/firebase_utils';

import Header from '../../components/header/header.component';
import SearchBox from '../../components/search-box/search-box.component'
import CardList from '../../components/card-list/card-list.component'


const Home = () => {
    const [getGTCourses, setGTCourses] = useState("");

    const onSearchChange = async event => {
        setGTCourses(await filterGTCourses(event.target.value.toUpperCase()))
    }

    return (
        <div className='home'>
            <Header />
            <SearchBox onSearchChange={onSearchChange} />
            <CardList courses={getGTCourses} type="gt" />
        </div>
    )

}

export default Home;