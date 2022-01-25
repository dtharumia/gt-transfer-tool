import React from 'react';
import { useNavigate } from 'react-router-dom';

import './card.styles.scss';

const Card = ({ course, type }) => {
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
        <div className='card'>
            {
                type == 'gt' ?
                    (<div className='gt-card' onClick={CourseSelect}>
                        <span className='course'>{course}</span>
                    </div>)
                    :
                    <div className='transfer-card'>
                        <p className='transfer-school'>{course.t_school}</p>
                        <p className='transfer-class'>{course.t_class}</p>
                        <p className='gt-title'>{course.gt_title}</p>
                        <p className='gt-class'>{course.gt_class}</p>
                    </div>
            }

        </div>
    )
}

export default Card;