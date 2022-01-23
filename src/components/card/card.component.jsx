import React from 'react';

import './card.styles.scss';

const Card = ({ course: { t_school, t_class, gt_title, gt_class } }) => {
    return <div className='card'>
        <span className='transfer-school'>{t_school} - </span>
        <span className='transfer-class'>{t_class} - </span>
        <span className='gt-title'>{gt_title} - </span>
        <span className='gt-class'>{gt_class}</span>
    </div>
}

export default Card;