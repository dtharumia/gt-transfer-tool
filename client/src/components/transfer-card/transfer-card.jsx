import React from 'react';
import { useNavigate } from 'react-router-dom';

import './transfer-card.styles.scss';

const TransferCard = ({ transfer }) => {
    const navigate = useNavigate();

    const SchoolSelect = () => {

        navigate(`/school/${transfer.t_school.replaceAll(" ", "_")}`)
    }
    return (
        <div className='transfer-card' onClick={SchoolSelect}>
            <span className='transfer-school'>{transfer.t_school}</span>
            <span className='transfer-class'>{transfer.t_class}</span>

        </div>

    )
}

export default TransferCard;