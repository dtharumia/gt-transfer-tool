import React from 'react';

import './transfer-card.styles.scss';

const TransferCard = ({ transfer }) => {

    return (
        <div className='transfer-card'>
            <span className='transfer-school'>{transfer.t_school}</span>
            <span className='transfer-class'>{transfer.t_class}</span>
            
        </div>

    )
}

export default TransferCard;