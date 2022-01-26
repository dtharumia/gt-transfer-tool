import React from 'react';

import './school-card.styles.scss';

const SchoolCard = ({ course }) => {

    return (
        <div className='school-card' >
            <span className='transfer-title'>{course.t_title}</span>
            <span className='transfer-class'>{course.t_class}</span>
            <span className='gt-title'>{course.gt_title}</span>
            <span className='gt-class'>{course.gt_class}</span>

        </div>

    )
}

export default SchoolCard;