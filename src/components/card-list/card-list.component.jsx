import React from 'react';
import CardHeader from '../card-header/card-header.component'


import './card-list.styles.scss';


const CardList = ({ transfers }) => {
    const states = new Set([]);
    transfers.map(transfer => states.add(transfer.state))

    return <div className='card-list'>
        {
            [...states].map(state => (

                <CardHeader key={state} state={state} courses={transfers.filter(transfer => transfer.state.includes(state))}></CardHeader>
            ))
        }
    </div >
}

export default CardList;

