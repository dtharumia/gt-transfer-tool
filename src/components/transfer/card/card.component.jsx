import React from 'react';

import './card.styles.scss';

const Card = ({ course: { t_school, t_class, gt_title, gt_class } }) => {
    return <div className='card'>
        <p className='transfer-school'>{t_school}</p>
        <p className='transfer-class'>{t_class}</p>
        <p className='gt-title'>{gt_title}</p>
        <p className='gt-class'>{gt_class}</p>
    </div>
}

export default Card;