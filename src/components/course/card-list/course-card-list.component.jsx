import React from 'react';
import CardHeader from '../../card-header/card-header.component'
import Card from '../card/card.component';

import './course-card-list.styles.scss';


class CourseCardList extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { courses } = this.props
        return <div className='card-list'>
            {
                courses.map((course, index) => {
                    return <Card key={index} course={course} />
                })
            }
        </div >
    }
}

export default CourseCardList;

