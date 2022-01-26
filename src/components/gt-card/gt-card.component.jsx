import React from 'react';
import { useNavigate } from 'react-router-dom';

import './gt-card.styles.scss';

const GTCard = ({ gt_class, gt_title }) => {
    const navigate = useNavigate();

    const CourseSelect = () => {

        navigate(`course/${gt_class.replaceAll(" ", "_")}`, {
            state: {
                gt_class: gt_class,
                gt_title: gt_title
            }
        })
    }

    return (
        <div className='gt-card' onClick={CourseSelect}>
            <span className='gt-class'>{gt_class}</span>
            <span className='gt-title'>{gt_title}</span>
        </div>
    )
}

export default GTCard;