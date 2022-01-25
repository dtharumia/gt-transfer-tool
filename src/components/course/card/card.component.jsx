import React from 'react';

import './card.styles.scss';

const Card = ({course}) => {
    return <div className='card'>
        <p className='gt-class'>{course}</p>
      
    </div>
}

export default Card;