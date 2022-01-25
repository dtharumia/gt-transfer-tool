import React from 'react';
import { useNavigate } from 'react-router-dom';

import './card.styles.scss';

const Card = ({ gtCourse }) => {
    const navigate = useNavigate();

    const CourseSelect = (e) => {

        navigate(`course/${e.target.textContent.replace(" ","")}`)
    };

    return (
        <div className='card' onClick={CourseSelect}>
            <span className='gt-course'>{gtCourse}</span>
        </div>
    )
}

export default Card;