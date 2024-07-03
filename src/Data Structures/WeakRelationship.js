import React from 'react';

const WeakRelationship = ({name,handleClick}) => {

    const ItemType = 'Weak Relationship'

    return (
        <>
            <div
                className= 'weak-relationship'
            >

            <span className={'weak-relationship-button'} onClick={handleClick}>
                x
            </span>

                <p className={'weak-relationship-text'}>{ItemType}</p>

            </div>

        </>
    );
};

export default WeakRelationship;