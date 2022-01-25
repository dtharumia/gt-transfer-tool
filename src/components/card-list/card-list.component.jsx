import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.scss';


const CardList = ({ courses, type }) => {
    return <div className='card-list'>
        {
            courses.map((course, index) => (
                <Card key={index} course={course} type={type}/>
            ))
        }
    </div>
}

export default CardList;

