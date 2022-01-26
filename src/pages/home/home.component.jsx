import React from 'react';

import './home.styles.scss'
import { filterGTCourses, getGTCourses, getTransferCourses } from '../../firebase/firebase_utils';

import Header from '../../components/header/header.component';
import SearchBox from '../../components/search-box/search-box.component'
import CardList from '../../components/card-list/card-list.component'


class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            gtCourses: {},
            searchField: ""
        }
    }

    componentDidMount() {
        getGTCourses()
            .then((gtCourses) => this.setState({ gtCourses: gtCourses }))
        
    }

    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    }

    filteredGTCourses = () => getTransferCourses("CS 4400")
        .then((transferCourses) => transferCourses)

    render() {

        const { gtCourses, searchField } = this.state

        const filteredGTCourses = Object.keys(gtCourses)
            .filter((gtCourse) => gtCourse.toUpperCase().includes(searchField.toUpperCase()))
            .reduce((gtClass, gtTitle) => { return Object.assign(gtClass, { [gtTitle]: gtCourses[gtTitle] }) }, {});

        return <div className='home'>
            <Header />
            <SearchBox onSearchChange={this.onSearchChange} />
            <CardList courses={filteredGTCourses} type="gt" />
        </div>
    }

}

export default Home;