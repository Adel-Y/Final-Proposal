import React from 'react';

const WeakEntity = ({name,handleClick}) => {

    const ItemType = 'Weak Entity'

    return (
        <>
            <div
                className= 'weak-entity'
            >

            <span className={'weak-entity-button'} onClick={handleClick}>
                x
            </span>

                <p className={'weak-entity-text'}>{ItemType}</p>

            </div>

        </>
    );
};

export default WeakEntity;