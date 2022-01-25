import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.scss';


const CardList = ({ gtCourses }) => {
    return <div className='card-list'>
        
        {
            gtCourses.map((course, index) => (
                <Card key={index} gtCourse={course} />
            ))
        }
    </div>
}

export default CardList;

