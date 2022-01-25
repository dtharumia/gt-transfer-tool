import React from 'react';
import { useNavigate } from 'react-router-dom';

import './card.styles.scss';

const Card = ({ course }) => {
    const navigate = useNavigate();

    const CourseSelect = (e) => {
        const course = e.target.textContent;

        navigate(`course/${course.replace(" ", "")}`, {
            state: {
                course: course
            }
        })
    }

    return (
        <div className='card' onClick={CourseSelect}>
            <span className='course'>{course}</span>
        </div>
    )
}

export default Card;