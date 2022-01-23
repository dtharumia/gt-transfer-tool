import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.scss';

const CardList = ({ transfers }) => {
    return <div className='card-list'>
        {
            transfers.map(transfer => (

                <Card key={transfer.id} course={transfer}></Card>
            ))
        }
    </div>
}

export default CardList;