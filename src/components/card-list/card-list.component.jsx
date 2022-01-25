import React from 'react';
import GTCard from '../gt-card/gt-card.component';
import TransferCard from '../transfer-card/transfer-card.component';
import './card-list.styles.scss';


const CardList = ({ courses, type }) => {
    return <div className='card-list'>
        {
            type === "gt" ? (Object.keys(courses).map((course, index) => (
                <GTCard key={index} gt_class={course} gt_title={courses[course]} />
            ))) :

                (Object.values(courses).map((transfer, index) => (
                    <TransferCard key={index} transfer={transfer} />
                )))
        }
    </div>
}

export default CardList;

