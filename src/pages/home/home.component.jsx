import React from 'react';

import './home.styles.scss'
import { readCoursesfromDatabase } from '../../firebase/firebase_utils';

import Header from '../../components/header/header.component';
import SearchBox from '../../components/search-box/search-box.component'
import CardList from '../../components/card-list/card-list.component'

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            gtCourses: [],
            searchField: ""
        }
    }

    componentDidMount() {
        readCoursesfromDatabase()
            .then((e) => this.setState({ gtCourses: Object.keys(e) }))
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    }



    render() {

        const { gtCourses, searchField } = this.state

        const filteredGTCourses = gtCourses.filter(gtCourse =>
            gtCourse.toUpperCase().includes(searchField.toUpperCase())
        )

        return <div className='home'>
            <Header />
            <SearchBox onSearchChange={this.onSearchChange} />
            <CardList courses={filteredGTCourses} />
        </div>
    }

}

export default Home;