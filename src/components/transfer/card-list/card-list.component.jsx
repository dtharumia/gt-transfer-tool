import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.scss';


const CardList = ({ courses }) => {
    return <div className='card-list'>
        {
            courses.map((course, index) => (
                <Card key={index} course={course} />
            ))
        }
    </div>
}

export default CardList;

